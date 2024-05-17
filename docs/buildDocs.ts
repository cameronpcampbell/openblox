import * as prettier from "prettier";
import { Project, ts } from "ts-morph";
import tablemark from "tablemark"
import { mkdir, rmdir } from "node:fs/promises";


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrowFunction, CallExpression, Directory, Identifier, Node, ParameterDeclaration, SourceFile, TypeAliasDeclaration, TypeLiteralNode } from "ts-morph"
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const splitAtLastOccurrence = (str: string, separator: string) => {
  const lastIndex = str.lastIndexOf(separator);
  if (lastIndex === -1) {
    return [str];
  }
  
  const beforeLast = str.substring(0, lastIndex);
  const afterLast = str.substring(lastIndex + separator.length);
  return [beforeLast, afterLast];
}
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const root = `${splitAtLastOccurrence(Bun.main, "/openblox/")[0]}/openblox`
const docsSite = `${root}/docs_site`
const docsSitePages = `${docsSite}/pages`

const project = new Project({
  tsConfigFilePath: `${root}/tsconfig.json`,
})

const isoDateRegex = /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/g
const isoDateStrRegex = /(?:")((\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z)(?:")/g

const classicApis = project.getDirectory(`${root}/src/apis/classic`)?.getDirectories() as any as Directory[]
const cloudApis = project.getDirectory(`${root}/src/apis/cloud`)?.getDirectories() as any as Directory[]

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
const formatApiName = (apisName: string, apiName: string) => {
  const [ _, apiBaseName, apiVer ] = /^([a-zA-Z]+)(_V[0-9]+)?$/.exec(apiName) as any as [ string, string, string | undefined ];
  return `${apisName === "classic" ? "Classic" : ""}${apiBaseName.charAt(0).toUpperCase() + apiBaseName.slice(1)}Api${apiVer ? apiVer : ""}`
}

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
    apisMetaJson[apiName] = formatApiName(apisName, apiName)

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

Bun.write(`${root}/docs/docs.json`, JSON.stringify(allJsDocData, null, 2))

// writes the root _meta.json
await rmdir(docsSitePages, { recursive: true })
await mkdir(docsSitePages, { recursive: true })
await Bun.write(`${docsSitePages}/_meta.json`, JSON.stringify({
  "cloud": { type: "page", title: "Cloud APIs" },
  "classic": { type: "page", title: "Classic APIs" },
}, null, 4))

await Bun.write(`${docsSitePages}/_app.js`, `
import './styles.css'
 
export default function MyApp({ Component, pageProps }) {
  try {
    if (window.location.pathname.match(/^\\/cloud(\\/?)$/)) window.location.replace("/cloud/${
      Object.keys(allJsDocData["cloud"])[0]
    }/${
      Object.keys(allJsDocData["cloud"][Object.keys(allJsDocData["cloud"])[0] as any] as any)[0]
    }")
    else if (window.location.pathname.match(/^\\/classic(\\/?)$/)) window.location.replace("/classic/${
      Object.keys(allJsDocData["classic"])[0]
    }/${
      Object.keys(allJsDocData["classic"][Object.keys(allJsDocData["classic"])[0] as any] as any)[0]
    }")
  } catch {}

  return <Component {...pageProps} />
}
`)

await Bun.write(`${docsSite}/theme.config.tsx`, `
import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Openblox</span>,
  project: {
    link: 'https://github.com/mightypart/openblox',
  },
  docsRepositoryBase: 'https://github.com/mightypart/openblox',
  editLink: { text: null },
  feedback: { content: null },
  footer: {
    component: (
      <footer className="nx-bg-gray-100 nx-pb-[env(safe-area-inset-bottom)] dark:nx-bg-neutral-900 print:nx-bg-transparent" style={{ padding: "25px", borderTop: "1px solid #262626" }}>
          <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            Made with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="w-6 h-6"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" /></svg> and <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-binary"><rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/></svg> By Cameron Campbell (MightyPart). Special thanks to our <span><a style={{ fontWeight: 700, filter: "brightness(150%)" }} href="https://github.com/MightyPart/openblox/graphs/contributors">contributors</a>.</span>
          </span>
      </footer>
    )
  }
}

export default config
`)

await Bun.write(`${docsSitePages}/styles.css`, `
@media (min-width:768px) {
  .nextra-sidebar-container {
    width: 22rem !important;
  }
}
`)

// builds markdown.
await buildMdForApis(allJsDocData["cloud"] as any, "cloud", `${root}/docs_site/pages`)
await buildMdForApis(allJsDocData["classic"] as any, "classic", `${root}/docs_site/pages`)


console.log("done!")


console.log(count)