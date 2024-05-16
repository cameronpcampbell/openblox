import * as prettier from "prettier";
import { Project, ts } from "ts-morph";
import tablemark from "tablemark"
import { mkdir, rmdir } from "node:fs/promises";


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrowFunction, CallExpression, Directory, Identifier, Node, ParameterDeclaration, SourceFile, TypeAliasDeclaration, TypeLiteralNode } from "ts-morph"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const project = new Project({
  tsConfigFilePath: `${__dirname}/../tsconfig.json`,
})

const isoDateRegex = /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/g
const isoDateStrRegex = /(?:")((\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z)(?:")/g

const classicApis = project.getDirectory(`./src/apis/classic`)?.getDirectories() as any as Directory[]
const cloudApis = project.getDirectory(`./src/apis/cloud`)?.getDirectories() as any as Directory[]

const highlightedMethods = {
  GET: "[38;5;156mGET[0m[2;33m[0m",
  POST: "[38;5;117mPOST[0m[2;33m[0m",
  PATCH: "[38;5;216mPATCH[0m[2;33m[0m",
  DELETE: "[38;5;9mDELETE[0m[2;33m[0m",
  PUT: "[38;5;228mPUT[0m[2;33m[0m"
}

const allJsDocData: {
  cloud: { [apiName: string]: { [methodName: string]:  Awaited<ReturnType<typeof getJsDocData>> } },
  classic: { [apiName: string]: { [methodName: string]: Awaited<ReturnType<typeof getJsDocData>> } },
} = { cloud: {}, classic: {} }
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const getFullType = (typeNode: TypeLiteralNode) => {
  const typeNodeText = typeNode.getText()
  if (typeNodeText === "Identifier") return "Identifier"

  const external = typeNodeText.match(/import\("(.+)"\)\.(.+)/) as [ string, string, string ] | null
  if (!external) return typeNodeText

  const fileName = `${external[1]}.ts`, typeName = external[2]
  const typeSrc = project.getSourceFile(fileName) as any as SourceFile
  const fullType = typeSrc.getDescendantsOfKind(ts.SyntaxKind.TypeAliasDeclaration).filter(x => x.getName() === typeName)[0] as any as TypeAliasDeclaration

  return fullType.getChildren().slice(-1)[0]?.getFullText()
}

const getJsDocData = async (method?: ReturnType<SourceFile["getExportSymbols"]>[number]) => {
  if (!method) return
  const declarations = method.getDeclarations()
  if (!declarations.length) return

  const addApiMethodCall = (
    (declarations[0] as any as Node<ts.Node>).getChildren().find(x => x.getKind() === ts.SyntaxKind.CallExpression) as any as CallExpression
  )
  const arrowFn = addApiMethodCall.getArguments().find(x => x.getKind() === ts.SyntaxKind.ArrowFunction) as any as ArrowFunction
  const arrowFnArgObjParams = arrowFn.getParameters()
  const arrowFnArgObj = arrowFnArgObjParams.length && arrowFnArgObjParams.filter(x => x?.getTypeNode()?.getType().isObject())?.[0] as ParameterDeclaration

  const paramValues = (arrowFnArgObj ? Object.fromEntries(arrowFnArgObj.getTypeNode()?.getChildrenOfKind(ts.SyntaxKind.SyntaxList).map(
    x => x.getChildren()
    .map(x => x.getChildren().filter(x => x.getKind() !== ts.SyntaxKind.ColonToken ))
    .map(x => [ (x[0] as any as ts.Node).getText(), getFullType(x[1] as TypeLiteralNode) ])
  )[0] as any as [ Identifier, TypeLiteralNode ][]) : {}) as Record<string, string>

  const jsDocTags = method.getJsDocTags()
  const params: { name: string, type: string, description?: string }[] = []
  const parsedJsDocTags: { [name: string]: string } = {}

  let description: string | undefined = undefined
  const jsDocText = addApiMethodCall.getParent()?.getParent()?.getParent()?.getLeadingCommentRanges().slice(-1)[0]?.getText()
  if (jsDocText?.startsWith("/**")) description = jsDocText.split("\n", 2).slice(-1)[0]?.trim()?.replace(/^\*/, "")?.trimStart()

  for (const tag of jsDocTags) {
    const tagName = tag.getName(), tagData = tag.getText()
    let tagContent = tagData.slice(-1)[0]?.text.trim()
    
    if (tagName === "param") {
      const paramName = tagData[0]?.text
      if (paramName && tagContent) params.push({ name: paramName, type: paramValues[paramName] as string, description: tagContent })

    } else {
      if (tagName === "exampleData" || tagName === "exampleRawBody") {
        try {
          tagContent = (tagContent?.startsWith("{") || tagContent?.startsWith("[")) ? (
            await prettier.format(
              tagContent.replaceAll(isoDateStrRegex, "$1").replaceAll(isoDateRegex, "\"$&\"").replaceAll(/ +/g, " "),
              { parser: "json5", printWidth: 75 }
            )
          ) : undefined
        } catch(e) {
          throw e
        }

      } else if (tagName === "example") tagContent ? tagContent = (await prettier.format(tagContent.replaceAll("*\\/", "*/"), { parser: "typescript", printWidth: 120 })).trim() : null

      parsedJsDocTags[tagName] = tagContent ?? ""
    }
  }

  return { description, tags: parsedJsDocTags, params }
}

const buildDocsForApis = async (apis: Directory[], apisName: "classic" | "cloud") => {
  for (const api of apis) {
    console.log(api.getPath())
    const apiName = api.getBaseName()
    const apiFile = api.getSourceFile(`${api.getPath()}/${apiName}.ts`)
    allJsDocData[apisName][apiName] = {}
  
    const methods = apiFile!.getExportSymbols()
    for (const method of methods) {
      const methodName = method.getName()
      allJsDocData[apisName][apiName][methodName] = await getJsDocData(method)
    }
  }
}

const highlightEndpointMethod = (endpoint?: string) => {
  if (!endpoint) return ""
  const splitEndpoint = endpoint.split(" ", 2) 
  if (splitEndpoint.length !== 2) return

  return `${highlightedMethods[splitEndpoint[0] as any as keyof typeof highlightedMethods]} ${splitEndpoint[1]}`
}

type MdData = {
  description: string | undefined
  tags: { [name: string]: string },
  params: { name: string, type: string, description?: string }[]
}

const createMdFile = (methodName: string, { params, tags, description }: MdData) => (
  `
# ${methodName}${(description && description.length) ? `\n${description}` : ""}

${params.length ? `
## Parameters
${tablemark(params)}
` : ""}

## Example
\`\`\`js copy showLineNumbers
${tags.example} 
\`\`\`

## Endpoint
\`\`\`ansi
${highlightEndpointMethod(tags.endpoint)}
\`\`\`
  `
)

let count = 0

const buildMdForApis = async (apisJson: { [apiName: string]: { [apiMethod: string]: MdData } }, apisName: "classic" | "cloud", basePath: string) => {
  const apisMetaJson: Record<string, string> = {}
  await rmdir(`${basePath}/${apisName}`, { recursive: true })

  for (const [apiName, apis] of Object.entries(apisJson)) {
    apisMetaJson[apiName] = `${apisName === "classic" ? "Classic" : ""}${apiName.charAt(0).toUpperCase() + apiName.slice(1)}Api`

    const apiMetaJson: Record<string, string> = {}
    await mkdir(`${basePath}/${apisName}/${apiName}`, { recursive: true })

    for (const [methodName, methodData] of Object.entries(apis)) {
      await Bun.write(`${basePath}/${apisName}/${apiName}/${methodName}.md`, createMdFile(methodName, methodData))
      apiMetaJson[methodName] = methodName

      count += 1
    }

    await Bun.write(`${basePath}/${apisName}/${apiName}/_meta.json`, JSON.stringify(apiMetaJson, null, 4))
  }

  await Bun.write(`${basePath}/${apisName}/_meta.json`, JSON.stringify(apisMetaJson, null, 4))
}
//////////////////////////////////////////////////////////////////////////////////

// builds docs.
await buildDocsForApis(classicApis, "classic")
await buildDocsForApis(cloudApis, "cloud")

Bun.write("./buildDocs/docs.json", JSON.stringify(allJsDocData, null, 2))

// writes the root _meta.json
await mkdir("./buildDocs/docs_site/pages", { recursive: true })
await Bun.write(`./buildDocs/docs_site/pages/_meta.json`, JSON.stringify({
  "cloud": { type: "page", title: "Cloud APIs" },
  "classic": { type: "page", title: "Classic APIs" },
}, null, 4))

await Bun.write(`./buildDocs/docs_site/pages/_app.js`, `
import './styles.css'
 
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
`)


await Bun.write(`./buildDocs/docs_site/pages/styles.css`, `
@media (min-width:768px) {
  .nextra-sidebar-container {
    width: 22rem !important;
  }
}
`)

// builds markdown.
await buildMdForApis(allJsDocData["cloud"] as any, "cloud", "./buildDocs/docs_site/pages")
await buildMdForApis(allJsDocData["classic"] as any, "classic", "./buildDocs/docs_site/pages")


console.log("done!")


console.log(count)