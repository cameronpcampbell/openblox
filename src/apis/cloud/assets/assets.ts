// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "../../../utils/utils.types"
import { AssetField, PrettifiedAsset, RawAsset } from "./assets.types"
import { UnionPrettify } from "typeforge"
import { cloneAndMutateObject } from "src/utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "Assets", baseUrl: "https://apis.roblox.com/assets" })

const assetsDefaultFields = "assetType,assetId,creationContext,description,displayName,path,revisionId,revisionCreateTime,moderationResult,icon,previews"
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
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
export const assetInfo = addApiMethod(async <AssetId extends Identifier, Field extends AssetField = AssetField>(
  { assetId, fields }: { assetId: AssetId, fields?: Field[] }
): ApiMethod<RawAsset<AssetId, Field>, PrettifiedAsset<AssetId, Field>> => ({
  method: "GET",
  path: `/v1/assets/${assetId}`,
  searchParams: { readMask: fields || assetsDefaultFields },
  name: `assetInfo`,

  prettifyFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    const revisionCreateTime = obj.revisionCreateTime
    if (revisionCreateTime) obj.revisionCreateTime = new Date(revisionCreateTime)
  }) as any
}))