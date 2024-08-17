import type { Identifier, ISODateTime, ObjectKeepKeys, ObjectPrettify, StringIsLiteral, UnionPrettify } from "typeforge"
import type { LongRunningOperation, ObjectRemoveReadOnly } from "../../../apis/apis.types";


export type AssetField = UnionPrettify<"assetType" | "assetId" | "creationContext" | "description" | "displayName" | "path" | "revisionId" | "revisionCreateTime" | "moderationResult" | "icon" | "previews" | "state">

export type AssetType = UnionPrettify<"Audio" | "Decal" | "Model" | "Video">

type Or<T, U> = T extends false ? U extends false ? false : true : true;

type And<X, Y> = X extends true ? (Y extends true ? true : false) : false;

type AssetExtension = UnionPrettify<"mp3" | "ogg" | "png" | "jpeg" | "bmp" | "tga" | "fbx" | "mp4" | "mov">

export type AssetFileName = `${string}.${AssetExtension}`

export type AssetPreview = {
  asset: `assets/${Identifier}`,
  altText: string
}

type AssetModerationState = UnionPrettify<"Approved" | "Reviewing" | "Rejected">

type UserIdIsNotNever<UserId extends Identifier> = true extends (UserId extends Identifier ? true : false) ? true : false

export type Asset<
  TemporalType extends Date | ISODateTime = Date | ISODateTime, AssetId extends Identifier = Identifier,
  DisplayName extends string = string, Description extends string | undefined = string,
  UserId extends Identifier = Identifier, GroupId extends Identifier = Identifier,
  ThisAssetType extends AssetType = AssetType, Preview extends AssetPreview = AssetPreview
> = ({
  path: `assets/${AssetId}`,
  revisionId: `${number}`,
  revisionCreateTime: TemporalType,
  assetId: AssetId,
  displayName: DisplayName,
} & (
    Description extends undefined
      ? {}
      : StringIsLiteral<Description> extends true ? { description: Description } : { description?: Description }
) & {
  assetType: ThisAssetType,
  creationContext: {
    creator: (
      And<UserIdIsNotNever<UserId>, true extends (GroupId extends Identifier ? true : false) ? true : false> extends true
        ? { userId: UserId } | { groupId: GroupId }
        : UserIdIsNotNever<UserId> extends true ? { userId: UserId } : { groupId: GroupId }
    ),
  },
  moderationResult: {
    moderationState: AssetModerationState
  },
} & (
  true extends (Preview extends AssetPreview ? true : false)
    ? { previews: ObjectRemoveReadOnly<Preview>[] }
    : {}
) & {
  state: "Active"
})


// GET /v1/assets/{assetId} ------------------------------------------------------
export type RawAsset<AssetId extends Identifier, Field extends AssetField> = NonNullable<ObjectKeepKeys<Asset<ISODateTime, AssetId>, Field>>

export type PrettifiedAsset<AssetId extends Identifier, Field extends AssetField> = NonNullable<ObjectKeepKeys<Asset<Date, AssetId>, Field>>
// -------------------------------------------------------------------------------


// POST & PATCH /v1/assets -------------------------------------------------------
export type RawLongRunningAssetData<
  AssetId extends Identifier, DisplayName extends string, Description extends string | undefined, UserId extends Identifier,
  GroupId extends Identifier, ThisAssetType extends AssetType, Preview extends AssetPreview
> = LongRunningOperation<`operations/${string}`, Asset<
  ISODateTime, AssetId, DisplayName, Description, UserId, GroupId, ThisAssetType, Preview
>>

export type PrettifiedLongRunningAssetData<
  AssetId extends Identifier, DisplayName extends string, Description extends string | undefined, UserId extends Identifier,
  GroupId extends Identifier, ThisAssetType extends AssetType, Preview extends AssetPreview
> = LongRunningOperation<`operations/${string}`, Asset<
  Date, AssetId, DisplayName, Description, UserId, GroupId, ThisAssetType, Preview
>>
// -------------------------------------------------------------------------------


// GET /v1/assets/{assetId}/versions/{version} && GET /v1/assets/{assetId}/versions
export type AssetOfVersionData<AssetId extends Identifier, Version extends number = number> = ObjectPrettify<{
  path: `assets/${AssetId}/versions/${Version}`,
  creationContext: {
    creator: { userId: Identifier } | { groupId: Identifier }
  },
  moderationResult: {
    moderationState: AssetModerationState
  }
}>
// -------------------------------------------------------------------------------



// POST & PATCH /v1/assets -------------------------------------------------------
export type RawAssetVersionsData<AssetId extends Identifier> = {
  assetVersions: AssetOfVersionData<AssetId>[]
}

export type PrettifiedAssetVersionsData<AssetId extends Identifier> = AssetOfVersionData<AssetId>[]
// -------------------------------------------------------------------------------