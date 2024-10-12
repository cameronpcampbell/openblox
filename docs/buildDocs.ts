import * as prettier from "prettier";
import { Project, ts } from "ts-morph";
import tablemark from "tablemark"
import { mkdir, rmdir } from "node:fs/promises";
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrowFunction, CallExpression, Directory, Identifier, Node, ParameterDeclaration, SourceFile, TypeAliasDeclaration, TypeLiteralNode } from "ts-morph"
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
async function getFiles( directoryPath: string ) {
    const fileNames = await readdir( directoryPath );
    const filePaths = fileNames.map( fn => join( directoryPath, fn ) );
    return filePaths;
}

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

const highlightedMethodsKeys = Object.keys(highlightedMethods) as unknown as Array<keyof typeof highlightedMethods>

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

  const arrowFnArgObjDec = ((arrowFnArgObjParams.length && arrowFnArgObjParams.filter(x => x?.getTypeNode()?.getType().isObject())?.[0]) as ParameterDeclaration)
  const arrowFnArgObj = arrowFnArgObjDec ? arrowFnArgObjDec?.getTypeNode()?.getChildrenOfKind(ts.SyntaxKind.SyntaxList)?.[0]?.getChildren() : undefined

  const paramValues: { [Key: string]: { type: string, isOptional: boolean } } = Object.fromEntries(
    arrowFnArgObj ? arrowFnArgObj.map(arg => {
      const children = arg.getChildren()
      const isOptional = children.find(x => x.getKind() === ts.SyntaxKind.QuestionToken) ? true : false

      const [ name, type ] = children.filter(x => {
        const kind = x.getKind()
        return kind !== ts.SyntaxKind.CommaToken && kind !== ts.SyntaxKind.ColonToken && kind !== ts.SyntaxKind.QuestionToken
      }).map(x => x.getText()) as [ string, string ]

      return [ name, { type, isOptional } ]
    })
  : [])

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
      const paramTypings = paramValues[paramName as any as keyof typeof paramValues]
      if (paramName && tagContent) params.push({
        name: `${paramName}${paramTypings?.isOptional ? "?" : ""}`, type: paramTypings?.type || "🤷", description: tagContent
      })

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
    const apiName = api.getBaseName()
    const apiFile = api.getSourceFile(`${api.getPath()}/${apiName}.ts`)
    allJsDocData[apisName][apiName] = {}
  
    const methods = apiFile?.getExportSymbols()
    if (!methods) continue

    for (const method of methods) {
      const methodName = method.getName()
      try {
        allJsDocData[apisName][apiName][methodName] = await getJsDocData(method)
      } catch {}
    }
  }
}

const highlightEndpointMethod = (endpoint?: string) => {
  if (!endpoint) return ""
  
  highlightedMethodsKeys.forEach(key => endpoint = (endpoint as string).replaceAll(`${key}`, highlightedMethods[key]))

  return endpoint
}

type MdData = {
  description: string | undefined
  tags: { [name: string]: string },
  params: { name: string, type: string, description?: string }[]
}

const createMdFile = (methodName: string, { params, tags:{ example, endpoint, exampleData }, description }: MdData) => (
  `
# ${methodName}${(description && description.length) ? `\n${description}` : ""}

${params.length ? `
## Parameters
${tablemark(params)}
` : ""}

## Example
\`\`\`ts copy showLineNumbers
${example} 
\`\`\`

${exampleData ? `
## Example Data
\`\`\`ts copy showLineNumbers
${exampleData.trim().replaceAll(isoDateStrRegex, "$1")} 
\`\`\`
` : ""}

## Endpoint
\`\`\`ansi
${highlightEndpointMethod(endpoint)}
\`\`\`
  `
)

let count = 0

const buildMdForApis = async (apisJson: { [apiName: string]: { [apiMethod: string]: MdData } }, apisName: "classic" | "cloud", basePath: string) => {
  const apisMetaJson: Record<string, string> = {}
  await rmdir(`${basePath}/${apisName}`, { recursive: true })

  for (const [apiName, apis] of Object.entries(apisJson)) {
    apisMetaJson[apiName] = formatApiName(apisName, apiName)

    const apiMetaJson: Record<string, string> = { }
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
  "guides": { type: "page", title: "Guides" },
  "cloud": { type: "page", title: "Cloud APIs" },
  "classic": { type: "page", title: "Classic APIs" },
  "index": { type: "page", display: "hidden" }
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
  logo: <svg width="133.25" height="26" viewBox="0 0 1312 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M148.658 163.781L19.4926 129.166L0 201.892L201.891 256L230.468 149.4L157.742 129.908L148.658 163.781Z" fill="white" style={{ fill: "white", fillOpacity: 1 }} />
  <path d="M25.5312 106.6L54.108 0L256 54.1079L236.507 126.808L107.342 92.1924L98.2578 126.067L25.5312 106.6Z" fill="#3178C6" style={{ fill: "color(display-p3 0.1922 0.4706 0.7765)", fillOpacity:1 }}/>
  <path d="M396.05 204.035C381.805 204.035 370.477 199.965 362.066 191.825C353.79 183.685 349.652 172.425 349.652 158.044V97.401C349.652 82.8847 353.79 71.6243 362.066 63.62C370.477 55.48 381.805 51.41 396.05 51.41C410.295 51.41 421.555 55.48 429.831 63.62C438.242 71.6243 442.448 82.8168 442.448 97.1975V158.044C442.448 172.425 438.242 183.685 429.831 191.825C421.555 199.965 410.295 204.035 396.05 204.035ZM396.05 181.65C402.969 181.65 408.192 179.818 411.72 176.155C415.247 172.357 417.011 166.998 417.011 160.079V95.366C417.011 88.3113 415.247 82.9525 411.72 79.2895C408.192 75.6265 402.969 73.795 396.05 73.795C389.131 73.795 383.908 75.6265 380.381 79.2895C376.853 82.9525 375.09 88.3113 375.09 95.366V160.079C375.09 166.998 376.853 172.357 380.381 176.155C384.044 179.818 389.267 181.65 396.05 181.65ZM472.69 238.63V90.075H497.517V112.663H503.215L495.889 123.245C495.889 112.392 498.806 103.845 504.64 97.6045C510.473 91.2282 518.342 88.04 528.246 88.04C535.436 88.04 541.744 89.8715 547.171 93.5345C552.733 97.0618 557.007 102.014 559.992 108.39C563.112 114.766 564.672 122.228 564.672 130.775V161.096C564.672 169.643 563.112 177.173 559.992 183.685C557.007 190.061 552.801 195.081 547.375 198.744C541.948 202.271 535.572 204.035 528.246 204.035C518.342 204.035 510.473 200.847 504.64 194.47C498.806 188.094 495.889 179.547 495.889 168.829L503.215 179.615H497.314L498.128 207.291V238.63H472.69ZM518.681 182.057C525.193 182.057 530.213 180.293 533.74 176.766C537.403 173.103 539.235 167.676 539.235 160.486V131.589C539.235 124.263 537.403 118.836 533.74 115.309C530.213 111.782 525.193 110.018 518.681 110.018C512.169 110.018 507.082 111.985 503.419 115.919C499.891 119.854 498.128 125.416 498.128 132.606V159.468C498.128 166.659 499.891 172.221 503.419 176.155C507.082 180.09 512.169 182.057 518.681 182.057ZM640.295 204.035C630.798 204.035 622.522 202.204 615.468 198.54C608.413 194.877 602.918 189.722 598.984 183.074C595.185 176.291 593.286 168.355 593.286 159.265V132.81C593.286 123.72 595.185 115.852 598.984 109.204C602.918 102.421 608.413 97.1975 615.468 93.5345C622.522 89.8715 630.798 88.04 640.295 88.04C649.656 88.04 657.796 89.8715 664.715 93.5345C671.769 97.1975 677.196 102.353 680.995 109C684.929 115.512 686.896 123.178 686.896 131.996V152.346H617.706V160.079C617.706 167.676 619.673 173.442 623.608 177.376C627.542 181.175 633.104 183.074 640.295 183.074C645.586 183.074 650.063 182.193 653.726 180.429C657.524 178.53 659.763 175.816 660.441 172.289H685.675C683.911 181.921 678.892 189.654 670.616 195.488C662.34 201.186 652.233 204.035 640.295 204.035ZM662.476 137.897V131.792C662.476 124.059 660.577 118.09 656.778 113.884C653.115 109.679 647.621 107.576 640.295 107.576C632.969 107.576 627.338 109.747 623.404 114.088C619.605 118.294 617.706 124.263 617.706 131.996V135.862L664.308 135.659L662.476 137.897ZM716.731 202V90.075H741.558V111.442H748.477L740.948 117.344C741.083 108.39 743.932 101.267 749.495 95.9765C755.057 90.6855 762.451 88.04 771.676 88.04C782.665 88.04 791.416 91.703 797.928 99.029C804.575 106.355 807.899 116.191 807.899 128.536V202H782.462V131.589C782.462 124.67 780.698 119.379 777.171 115.716C773.643 111.917 768.759 110.018 762.519 110.018C756.142 110.018 751.123 111.917 747.46 115.716C743.932 119.515 742.169 124.941 742.169 131.996V202H716.731ZM894.307 204.035C884.403 204.035 876.535 200.915 870.701 194.674C864.867 188.298 861.951 179.683 861.951 168.829L869.277 179.411H863.579V202H838.752V53.445H864.189V84.784L863.375 112.663H869.277L861.747 123.245C861.747 112.392 864.664 103.845 870.498 97.6045C876.467 91.2282 884.403 88.04 894.307 88.04C905.296 88.04 914.114 91.9065 920.762 99.6395C927.41 107.372 930.734 117.819 930.734 130.978V161.3C930.734 174.324 927.41 184.702 920.762 192.435C914.114 200.168 905.296 204.035 894.307 204.035ZM884.743 182.057C891.255 182.057 896.274 180.293 899.802 176.766C903.465 173.103 905.296 167.676 905.296 160.486V131.589C905.296 124.263 903.465 118.836 899.802 115.309C896.274 111.782 891.255 110.018 884.743 110.018C878.231 110.018 873.143 111.985 869.48 115.919C865.953 119.854 864.189 125.416 864.189 132.606V159.468C864.189 166.659 865.953 172.221 869.48 176.155C873.143 180.09 878.231 182.057 884.743 182.057ZM1024.26 202C1016.94 202 1010.49 200.508 1004.93 197.523C999.505 194.538 995.231 190.333 992.111 184.906C988.991 179.344 987.431 172.967 987.431 165.777V76.4405H950.597V53.445H1012.87V165.166C1012.87 169.372 1014.02 172.764 1016.33 175.341C1018.77 177.783 1022.03 179.004 1026.1 179.004H1058.86V202H1024.26ZM1128.17 203.832C1118.68 203.832 1110.4 202 1103.35 198.337C1096.29 194.674 1090.86 189.519 1087.07 182.871C1083.27 176.088 1081.37 168.151 1081.37 159.061V133.013C1081.37 123.788 1083.27 115.852 1087.07 109.204C1090.86 102.556 1096.29 97.401 1103.35 93.738C1110.4 90.075 1118.68 88.2435 1128.17 88.2435C1137.81 88.2435 1146.08 90.075 1153 93.738C1160.05 97.401 1165.48 102.556 1169.28 109.204C1173.08 115.852 1174.98 123.788 1174.98 133.013V159.061C1174.98 168.151 1173.08 176.088 1169.28 182.871C1165.48 189.519 1160.05 194.674 1153 198.337C1146.08 202 1137.81 203.832 1128.17 203.832ZM1128.17 181.65C1134.96 181.65 1140.18 179.818 1143.84 176.155C1147.64 172.357 1149.54 166.93 1149.54 159.875V132.199C1149.54 125.009 1147.64 119.582 1143.84 115.919C1140.18 112.256 1134.96 110.425 1128.17 110.425C1121.53 110.425 1116.3 112.256 1112.5 115.919C1108.7 119.582 1106.81 125.009 1106.81 132.199V159.875C1106.81 166.93 1108.7 172.357 1112.5 176.155C1116.3 179.818 1121.53 181.65 1128.17 181.65ZM1196.47 202L1235.54 144.206L1199.12 90.075H1227.81L1245.11 117.547C1246.19 119.175 1247.14 121.007 1247.96 123.042C1248.9 125.077 1249.65 126.705 1250.19 127.926C1250.74 126.705 1251.48 125.077 1252.43 123.042C1253.38 121.007 1254.33 119.175 1255.28 117.547L1272.58 90.075H1301.48L1265.05 144.206L1303.92 202H1275.02L1255.69 171.271C1254.6 169.508 1253.59 167.608 1252.64 165.573C1251.69 163.538 1250.87 161.91 1250.19 160.689C1249.65 161.91 1248.9 163.538 1247.96 165.573C1247.01 167.608 1245.99 169.508 1244.9 171.271L1225.37 202H1196.47Z" fill="white" style={{ fill: "white", fillOpacity: 1 }} />
  </svg>,
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


try {
  for (const file of await getFiles(`${root}/docs/pages/guides`)) {
    const fileText = await Bun.file(file).text()
    const fileRelPath = file.replace(new RegExp(`^${root}/docs/pages/`), "")
  
    await Bun.write(`${docsSitePages}/${fileRelPath}`, fileText)
  }
  
  Bun.write(`${docsSitePages}/index.md`, await Bun.file(`${root}/docs/pages/index.md`)?.text() ?? "")
} catch { console.log("error") }

console.log("done!")