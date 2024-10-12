// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Asset, AssetField, AssetFileName, AssetOfVersionData, AssetPreview, AssetType, PrettifiedAsset, PrettifiedAssetVersionsData, PrettifiedLongRunningAssetData, RawAsset, RawAssetVersionsData, RawLongRunningAssetData } from "./assets.types"
import { Falsey, ObjectEither, ObjectPrettify, Identifier } from "typeforge"
import { cloneAndMutateObject, formDataBuilder } from "../../../utils/utils"
import { readFile } from "../../../file"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "Assets", baseUrl: "https://apis.roblox.com/assets" })

const assetsDefaultFields = "assetType,assetId,creationContext,description,displayName,path,revisionId,revisionCreateTime,moderationResult,icon,previews,state"
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const prettifyAssetData = (rawData: Asset) => cloneAndMutateObject(rawData, (obj:any) => {
  const revisionCreateTime = obj.revisionCreateTime
  if (revisionCreateTime) obj.revisionCreateTime = new Date(revisionCreateTime)
}) as any

const prettifyLongRunningAssetData = (rawData: any) => {
  const response = rawData.response
  if (!response) return rawData

  return {
    ...rawData,
    response: prettifyAssetData(response as any)
  }
}

const formDataWithAssetFile = async (
  formData: FormData, assetType: AssetType, file: string | Buffer, fileName: string | Falsey
) => {
  const rawAssetType =
    assetType == "Audio" ? "auto" :
    assetType == "Decal" ? "image" :
    assetType == "Model" ? "model" :
    "video"

  const fileIsBuffer =  file instanceof Buffer

  const extension = /.+\.(.+)/.exec((fileIsBuffer ? fileName : file) as string)?.[1]
  const typeExtension = extension == "mp3" ? "mpeg" : extension

  formData.append(
    'fileContent', new Blob([fileIsBuffer ? file : await readFile(file)],
    { type: `${rawAssetType}/${typeExtension}` }), `${rawAssetType}.${extension}`
  )

  return formData
}
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information for a specific asset.
 * @endpoint GET /v1/assets/{assetId}
 * 
 * @param assetId The ID of the asset to get information for.
 * @param fields The specific fields to get (if omitted then all fields will be gotten).
 * 
 * @example const { data:assetInfo } = await AssetsApi.assetInfo({ assetId: 16989283104 })
 * @exampleData {"path":"assets/16989283104","revisionId":"1","revisionCreateTime":"2024-04-02T22:57:45.953Z","assetId":"16989283104","displayName":"suzanne","assetType":"Model","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"},"previews":[]}
 * @exampleRawBody {"path":"assets/16989283104","revisionId":"1","revisionCreateTime":"2024-04-02T22:57:45.953Z","assetId":"16989283104","displayName":"suzanne","assetType":"Model","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"},"previews":[]}
 */
export const assetInfo = createApiMethod(async <AssetId extends Identifier, Field extends AssetField = AssetField>(
  { assetId, fields }: { assetId: AssetId, fields?: Field[] }
): ApiMethod<RawAsset<AssetId, Field>, PrettifiedAsset<AssetId, Field>> => ({
  method: "GET",
  path: `/v1/assets/${assetId}`,
  searchParams: { readMask: fields || assetsDefaultFields },
  name: `assetInfo`,
  
  formatRawDataFn: prettifyAssetData as any
}))


/**
 * Creates a new asset.
 * @endpoint POST /v1/assets
 * 
 * @param displayName The display name for the asset.
 * @param description The description for the asset.
 * @param userId Define a userId to create the asset under the user.
 * @param groupId Define a groupId to create the asset under the group.
 * @param assetType The type for the asset.
 * @param file The file containing the asset data.
 * @param fileName This is required if your `file` argument is a `Buffer`.
 * @param expectedPrice Expected asset upload fee in Robux. When the actual price is more than expected, the operation fails.
 * @param previews The thumbnail previews for the asset.
 * 
 * @example
 * const { data:createdAssetInfo } = await AssetsApi.createAsset({
     assetType: "Model", displayName: "Model", userId: 45348281, file: "suzanne.fbx"
   })
 * @exampleData {"path":"operations/b9682431-3c86-4473-8779-2ae9df9f0c0e","operationId":"b9682431-3c86-4473-8779-2ae9df9f0c0e","done":true,"response":{"path":"assets/18490359719","revisionId":"1","revisionCreateTime":"2024-07-14T18:02:50.597Z","assetId":"18490359719","displayName":"Model","assetType":"Model","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"},"state":"Active"}} 
 * @exampleRawBody {"path":"operations/b9682431-3c86-4473-8779-2ae9df9f0c0e","operationId":"b9682431-3c86-4473-8779-2ae9df9f0c0e","done":true,"response":{"path":"assets/18490359719","revisionId":"1","revisionCreateTime":"2024-07-14T18:02:50.597689600Z","assetId":"18490359719","displayName":"Model","assetType":"Model","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"},"state":"Active"}}
 */
export const createAsset = createApiMethod(async <
  DisplayName extends string, ThisAssetType extends AssetType,
  UserId extends Identifier|never = never, GroupId extends Identifier|never = never,
  Description extends string | undefined = undefined, const Preview extends AssetPreview = never
>(
  { displayName, description, userId, groupId, assetType, file, fileName, expectedPrice, previews }:
  ObjectPrettify<
    {
      displayName: DisplayName, description?: Description, assetType: ThisAssetType,
      expectedPrice?: number, previews?: Preview[]
    }
    & ObjectEither<{ userId: UserId }, { groupId: GroupId }>
    & ObjectEither<{ file: string }, { file: Buffer, fileName: AssetFileName }>
  >
): ApiMethod<
    RawLongRunningAssetData<Identifier, DisplayName, Description, UserId, GroupId, ThisAssetType, Preview>,
    PrettifiedLongRunningAssetData<Identifier, DisplayName, Description, UserId, GroupId, ThisAssetType, Preview>
  > => ({
  method: "POST",
  path: `/v1/assets`,
  name: `createAsset`,
  formData: await formDataWithAssetFile(
    formDataBuilder()
      .append("request", JSON.stringify({
        displayName, description, assetType, previews,
        creationContext: { creator: userId ? { userId } : { groupId }, expectedPrice },
      })),
    assetType, file, fileName
  ),

  formatRawDataFn: prettifyLongRunningAssetData
}))


/*
{
    request: {
      displayName, description, assetType, previews,
      creationContext: { creator: userId ? { userId } : { groupId }, expectedPrice },
    }
  }
*/


/**
 * Updates an asset.
 * @endpoint PATCH /v1/assets/{assetId}
 * 
 * @param assetId The ID of the asset to update.
 * @param assetType The type for the asset. Required if updating the assets file content.
 * @param displayName The display name for the asset.
 * @param description The description for the asset.
 * @param file The file containing the new asset data.
 * @param fileName This is required if your `file` argument is a `Buffer`.
 * @param expectedPrice Expected asset upload fee in Robux. When the actual price is more than expected, the operation fails.
 * @param previews The thumbnail previews for the asset.
 * 
 * @example
 * const { data:updatedAssetInfo } = await AssetsApi.updateAsset({
     assetId: 18494719558, file: "suzanne.fbx", assetType: "Model"
   })
 * @exampleData {"path":"operations/b9682431-3c86-4473-8779-2ae9df9f0c0e","operationId":"b9682431-3c86-4473-8779-2ae9df9f0c0e","done":true,"response":{"path":"assets/18490359719","revisionId":"2","revisionCreateTime":"2024-07-14T18:02:50.597Z","assetId":"18490359719","displayName":"Model","assetType":"Model","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"},"state":"Active"}} 
 * @exampleRawBody {"path":"operations/b9682431-3c86-4473-8779-2ae9df9f0c0e","operationId":"b9682431-3c86-4473-8779-2ae9df9f0c0e","done":true,"response":{"path":"assets/18490359719","revisionId":"2","revisionCreateTime":"2024-07-14T18:02:50.597689600Z","assetId":"18490359719","displayName":"Model","assetType":"Model","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"},"state":"Active"}}
 */
export const updateAsset = createApiMethod(async <
  AssetId extends Identifier, DisplayName extends string, ThisAssetType extends AssetType,
  Description extends string | undefined = undefined, const Preview extends AssetPreview = never
>(
  { assetId, assetType, displayName, description, expectedPrice, file, fileName, previews }:
  ObjectPrettify<
  {
    assetId: AssetId, displayName?: DisplayName, description?: Description,
    expectedPrice?: number, previews?: Preview[]
  }
  & ObjectEither<
      ObjectEither<{ file: string, assetType: ThisAssetType }, {  }>,
      ObjectEither<{ file: Buffer, assetType: ThisAssetType, fileName: AssetFileName }, {  }>
    >
  >
): ApiMethod<
  RawLongRunningAssetData<AssetId, DisplayName, Description, Identifier, Identifier, ThisAssetType, Preview>,
  PrettifiedLongRunningAssetData<AssetId, DisplayName, Description, Identifier, Identifier, ThisAssetType, Preview>
> => ({
  method: "PATCH",
  path: `/v1/assets/${assetId}`,
  name: `updateAsset`,

  formData: (assetType && file)
    ? await formDataWithAssetFile(
      formDataBuilder()
        .append("request", JSON.stringify({
          assetId, displayName, description, previews,
          creationContext: expectedPrice ? { expectedPrice } : undefined
        })),
      assetType, file, fileName
    )
    : formDataBuilder()
      .append("request", JSON.stringify({
        assetId, displayName, description, previews,
        creationContext: expectedPrice ? { expectedPrice } : undefined
      })),

  formatRawDataFn: prettifyLongRunningAssetData
}))


/**
 * Gets an asset of a specific version.
 * @endpoint GET /v1/assets/{assetId}/versions/{version}
 * 
 * @param assetId The ID of the asset to get.
 * @param version The version of the asset to get.
 * 
 * @example const { data:assetInfo } = await AssetsApi.assetOfVersion({ assetId: 18508967120, version: 1 })
 * @exampleData {"path":"assets/18508967120/versions/1","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"}}
 * @exampleRawBody {"path":"assets/18508967120/versions/1","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"}}
 */
export const assetOfVersion = createApiMethod(async <AssetId extends Identifier, Version extends number>(
  { assetId, version }: { assetId: AssetId, version: Version }
): ApiMethod<AssetOfVersionData<AssetId, Version>> => ({
  method: "GET",
  path: `/v1/assets/${assetId}/versions/${version}`,
  name: `assetOfVersion`,
}))


/**
 * Lists versions of a specific asset.
 * @endpoint GET /v1/assets/{assetId}/versions
 * 
 * @param assetId The ID of the asset to get asset versions for.
 * @param limit The maximum amount of games to return. Valid values range from 1 to 50 (inclusive). Defaults to 8 when not provided.
 * @param cursor the paging cursor for the previous or next page.
 * 
 * @example const { data:versions } = await AssetsApi.assetVersions({ assetId: 18508967120 })
 * @exampleData [{"path":"assets/18494719558/versions/2","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"}},{"path":"assets/18494719558/versions/1","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"}}]
 * @exampleRawBody {"assetVersions":[{"path":"assets/18494719558/versions/2","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"}},{"path":"assets/18494719558/versions/1","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"}}]}
 */
export const assetVersions = createApiMethod(async <AssetId extends Identifier>(
  { assetId, limit, cursor }: { assetId: AssetId, limit?: number, cursor?: string }
): ApiMethod<RawAssetVersionsData<AssetId>, PrettifiedAssetVersionsData<AssetId>> => ({
  method: "GET",
  path: `/v1/assets/${assetId}/versions`,
  searchParams: { maxPageSize: limit, pageToken: cursor },
  name: `assetVersions`,

  formatRawDataFn: ({ assetVersions }) => assetVersions
}))


/**
 * Rolls back a specific version of an asset
 * @endpoint POST /v1/assets/{assetId}/versions/{version}:rollback
 * 
 * @param assetId The ID of the asset to rollback.
 * @param version The version of the asset to rollback.
 * 
 * @example const { data:rolledBackAssetInfo } = await AssetsApi.rollbackAssetVersion({ assetId: 18494719558, version: 2 })
 * @exampleData {"path":"assets/18494719558/versions/2","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"}}
 * @exampleRawBody {"path":"assets/18494719558/versions/2","creationContext":{"creator":{"userId":"45348281"}},"moderationResult":{"moderationState":"Approved"}}
 */
export const rollbackAssetVersion = createApiMethod(async <AssetId extends Identifier, Version extends number>(
  { assetId, version }: { assetId: AssetId, version: Version }
): ApiMethod<AssetOfVersionData<AssetId, Version>> => ({
  method: "POST",
  path: `/v1/assets/${assetId}/versions:rollback`,
  name: `rollbackAssetVersion`,
  body: { assetVersion: `assets/${assetId}/versions/${version}` }
}))