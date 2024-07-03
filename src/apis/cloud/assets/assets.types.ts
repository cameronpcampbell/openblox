// [ Types ] /////////////////////////////////////////////////////////////////////
import { Identifier, ISODateTime, ObjectKeepKeys } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////

export type AssetField = "assetType" | "assetId" | "creationContext" | "description" | "displayName" | "path" | "revisionId" | "revisionCreateTime" | "moderationResult" | "icon" | "previews"

type AssetType = "Audio" | "Decal" | "Model"

type Asset<TemporalType, AssetId extends Identifier, Field extends AssetField> = ObjectKeepKeys<{
    path: `assets/${AssetId}`,
    revisionId: `${number}`,
    revisionCreateTime: TemporalType,
    assetId: AssetId,
    displayName: string,
    assetType: AssetType,
    creationContext: {
      creator: {
        userId: Identifier,
      },
    },
    moderationResult: {
      moderationState: "Approved",
    },
    previews: {
      asset: string,
      altText: string
    }[],
}, Field>


// GET /v1/assets/${assetId} -----------------------------------------------------
export type RawAsset<AssetId extends Identifier, Field extends AssetField> = Asset<ISODateTime, AssetId, Field>

export type PrettifiedAsset<AssetId extends Identifier, Field extends AssetField> = Asset<Date, AssetId, Field>
// -------------------------------------------------------------------------------