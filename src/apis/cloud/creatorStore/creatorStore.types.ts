import type { ObjectPrettify, UnionPrettify, ObjectEither, Identifier, Falsey } from "typeforge"


export type CreatorStoreProduct_Type = UnionPrettify<"PRODUCT_TYPE_INVALID" | "PRODUCT_TYPE_AUDIO" | "PRODUCT_TYPE_MODEL" | "PRODUCT_TYPE_DECAL" | "PRODUCT_TYPE_PLUGIN" | "PRODUCT_TYPE_MESH_PART" | "PRODUCT_TYPE_VIDEO" | "PRODUCT_TYPE_FONT_FAMILY" | "Audio" | "Model" | "Decal" | "Plugin" | "MeshPart" | "Video" | "FontFamily">


type CreatorStoreProduct_CurrencyCode = "AFN" | "EUR" | "ALL" | "DZD" | "USD" | "AOA" | "XCD" | "ARS" | "AMD" | "AWG" | "AUD" | "AZN" | "BSD" | "BHD" | "BDT" | "BBD" | "BYN" | "BZD" | "XOF" | "BMD" | "INR" | "BTN" | "BOB" | "BOV" | "BAM" | "BWP" | "NOK" | "BRL" | "BND" | "BGN" | "BIF" | "CVE" | "KHR" | "XAF" | "CAD" | "KYD" | "CLP" | "CLF" | "CNY" | "COP" | "COU" | "KMF" | "CDF" | "NZD" | "CRC" | "HRK" | "CUP" | "CUC" | "ANG" | "CZK" | "DKK" | "DJF" | "DOP" | "EGP" | "SVC" | "ERN" | "SZL" | "ETB" | "FKP" | "FJD" | "XPF" | "GMD" | "GEL" | "GHS" | "GIP" | "GTQ" | "GBP" | "GNF" | "GYD" | "HTG" | "HNL" | "HKD" | "HUF" | "ISK" | "IDR" | "XDR" | "IRR" | "IQD" | "ILS" | "JMD" | "JPY" | "JOD" | "KZT" | "KES" | "KPW" | "KRW" | "KWD" | "KGS" | "LAK" | "LBP" | "LSL" | "ZAR" | "LRD" | "LYD" | "CHF" | "MOP" | "MKD" | "MGA" | "MWK" | "MYR" | "MVR" | "MRU" | "MUR" | "XUA" | "MXN" | "MXV" | "MDL" | "MNT" | "MAD" | "MZN" | "MMK" | "NAD" | "NPR" | "NIO" | "NGN" | "OMR" | "PKR" | "PAB" | "PGK" | "PYG" | "PEN" | "PHP" | "PLN" | "QAR" | "RON" | "RUB" | "RWF" | "SHP" | "WST" | "STN" | "SAR" | "RSD" | "SCR" | "SLL" | "SGD" | "XSU" | "SBD" | "SOS" | "SSP" | "LKR" | "SDG" | "SRD" | "SEK" | "CHE" | "CHW" | "SYP" | "TWD" | "TJS" | "TZS" | "THB" | "TOP" | "TTD" | "TND" | "TRY" | "TMT" | "UGX" | "UAH" | "AED" | "USN" | "UYU" | "UYI" | "UYW" | "UZS" | "VUV" | "VES" | "VND" | "YER" | "ZMW" | "ZWL" | "XBA" | "XBB" | "XBC" | "XBD" | "XTS" | "XXX" | "XAU" | "XPD" | "XPT" | "XAG" | "AFA" | "FIM" | "ALK" | "ADP" | "ESP" | "FRF" | "AOK" | "AON" | "AOR" | "ARA" | "ARP" | "ARY" | "RUR" | "ATS" | "AYM" | "AZM" | "BYB" | "BYR" | "BEC" | "BEF" | "BEL" | "BOP" | "BAD" | "BRB" | "BRC" | "BRE" | "BRN" | "BRR" | "BGJ" | "BGK" | "BGL" | "BUK" | "HRD" | "CYP" | "CSJ" | "CSK" | "ECS" | "ECV" | "GQE" | "EEK" | "XEU" | "GEK" | "DDM" | "DEM" | "GHC" | "GHP" | "GRD" | "GNE" | "GNS" | "GWE" | "GWP" | "ITL" | "ISJ" | "IEP" | "ILP" | "ILR" | "LAJ" | "LVL" | "LVR" | "LSM" | "ZAL" | "LTL" | "LTT" | "LUC" | "LUF" | "LUL" | "MGF" | "MVQ" | "MLF" | "MTL" | "MTP" | "MRO" | "MXP" | "MZE" | "MZM" | "NLG" | "NIC" | "PEH" | "PEI" | "PES" | "PLZ" | "PTE" | "ROK" | "ROL" | "STD" | "CSD" | "SKK" | "SIT" | "RHD" | "ESA" | "ESB" | "SDD" | "SDP" | "SRG" | "CHC" | "TJR" | "TPE" | "TRL" | "TMM" | "UGS" | "UGW" | "UAK" | "SUR" | "USS" | "UYN" | "UYP" | "VEB" | "VEF" | "VNC" | "YDD" | "YUD" | "YUM" | "YUN" | "ZRN" | "ZRZ" | "ZMK" | "ZWC" | "ZWD" | "ZWN" | "ZWR" | "XFO" | "XRE" | "XFU" | `X-${string}`

type CreatorStoreProduct_Price = ObjectPrettify<{
  currencyCode: CreatorStoreProduct_CurrencyCode,
  quantity: {
    significand: number,
    exponent: number
  }
}>

export type CreatorStoreProduct_OnlyOneId = ObjectPrettify<{
  pluginAssetId: Identifier,
  modelAssetId?: Falsey,
  audioAssetId?: Falsey,
  decalAssetId?: Falsey,
  meshPartAssetId?: Falsey,
  videoAssetId?: Falsey,
  fontFamilyAssetId?: Falsey
} | {
  pluginAssetId?: Falsey,
  modelAssetId: Identifier,
  audioAssetId?: Falsey,
  decalAssetId?: Falsey,
  meshPartAssetId?: Falsey,
  videoAssetId?: Falsey,
  fontFamilyAssetId?: Falsey
} | {
  pluginAssetId?: Falsey,
  modelAssetId?: Falsey,
  audioAssetId: Identifier,
  decalAssetId?: Falsey,
  meshPartAssetId?: Falsey,
  videoAssetId?: Falsey,
  fontFamilyAssetId?: Falsey
} | {
  pluginAssetId?: Falsey,
  modelAssetId?: Falsey,
  audioAssetId?: Falsey,
  decalAssetId: Identifier,
  meshPartAssetId?: Falsey,
  videoAssetId?: Falsey,
  fontFamilyAssetId?: Falsey
} | {
  pluginAssetId?: Falsey,
  modelAssetId?: Falsey,
  audioAssetId?: Falsey,
  decalAssetId?: Falsey,
  meshPartAssetId: Identifier,
  videoAssetId?: Falsey,
  fontFamilyAssetId?: Falsey
} | {
  pluginAssetId?: Falsey,
  modelAssetId?: Falsey,
  audioAssetId?: Falsey,
  decalAssetId?: Falsey,
  meshPartAssetId?: Falsey,
  videoAssetId: Identifier,
  fontFamilyAssetId?: Falsey
} | {
  pluginAssetId?: Falsey,
  modelAssetId?: Falsey,
  audioAssetId?: Falsey,
  decalAssetId?: Falsey,
  meshPartAssetId?: Falsey,
  videoAssetId?: Falsey,
  fontFamilyAssetId: Identifier
}>

type CreatorStoreProduct_Restriction = UnionPrettify<"RESTRICTION_UNSPECIFIED" | "SOLD_ITEM_RESTRICTED" | "SELLER_TEMPORARILY_RESTRICTED" | "SELLER_PERMANENTLY_RESTRICTED" | "SELLER_NO_LONGER_ACTIVE">

// GET /v2/creator-store-products/{productId} ------------------------------------
type CreatorStoreProduct_TypeNormalise<Type extends CreatorStoreProduct_Type, CamelCase extends boolean = false> = (
  Type extends "PRODUCT_TYPE_AUDIO" | "Audio" ? CamelCase extends true ? "audio" : "Audio"
  : Type extends "PRODUCT_TYPE_MODEL" | "Model" ? CamelCase extends true ? "model" : "Model"
  : Type extends "PRODUCT_TYPE_DECAL" | "Decal" ? CamelCase extends true ? "decal" : "Decal"
  : Type extends "PRODUCT_TYPE_PLUGIN" | "Plugin" ? CamelCase extends true ? "plugin" : "Plugin"
  : Type extends "PRODUCT_TYPE_MESH_PART" | "MeshPart" ? CamelCase extends true ? "meshPart" : "MeshPart"
  : Type extends "PRODUCT_TYPE_VIDEO" | "Video" ? CamelCase extends true ? "video" : "Video"
  : Type extends "PRODUCT_TYPE_FONT_FAMILY" | "FontFamily" ? CamelCase extends true ? "fontFamily" : "FontFamily"
  : `PRODUCT_TYPE_INVALID`
)

type CreatorStoreProductInfo_ProductTypeAndId<IdInfo extends CreatorStoreProduct_OnlyOneId> = (
  IdInfo["modelAssetId"] extends Identifier ? [ "PRODUCT_TYPE_MODEL", IdInfo["modelAssetId"] ]
  : IdInfo["pluginAssetId"] extends Identifier ? [ "PRODUCT_TYPE_PLUGIN", IdInfo["pluginAssetId"] ]
  : IdInfo["audioAssetId"] extends Identifier ? [ "PRODUCT_TYPE_AUDIO", IdInfo["audioAssetId"] ]
  : IdInfo["decalAssetId"] extends Identifier ? [ "PRODUCT_TYPE_DECAL", IdInfo["decalAssetId"] ]
  : IdInfo["meshPartAssetId"] extends Identifier ? [ "PRODUCT_TYPE_MESH_PART", IdInfo["meshPartAssetId"] ]
  : IdInfo["videoAssetId"] extends Identifier ? [ "PRODUCT_TYPE_VIDEO", IdInfo["videoAssetId"] ]
  : IdInfo["fontFamilyAssetId"] extends Identifier ? [ "PRODUCT_TYPE_FONT_FAMILY", IdInfo["fontFamilyAssetId"] ]
  : [ "PRODUCT_TYPE_INVALID", undefined ]
)

export type CreatorStoreProductInfo<
  IdInfo extends CreatorStoreProduct_OnlyOneId,
  ProductTypeAndId extends CreatorStoreProductInfo_ProductTypeAndId<IdInfo> = CreatorStoreProductInfo_ProductTypeAndId<IdInfo>
> = {
  path: `creator-store-products/CreatorMarketplaceAsset-${CreatorStoreProduct_TypeNormalise<ProductTypeAndId[0]>}-${ProductTypeAndId[1]}`,
  displayName: string,
  description: string,
  basePrice: CreatorStoreProduct_Price,
  purcahsePrice: CreatorStoreProduct_Price,
  published: boolean,
  restrictions: CreatorStoreProduct_Restriction[],
  purchasable: boolean,
}  & ObjectEither<
  { userSeller: Identifier },
  { groupSeller: Identifier }
> & {
  // @ts-ignore | hush hush shawty
  [K in `${CreatorStoreProduct_TypeNormalise<ProductTypeAndId[0], true>}AssetId`]: ProductTypeAndId[1]
}
// -------------------------------------------------------------------------------



export type CreatorStoreProduct_NewProductData = {
  displayName: string,
  description: string,
  basePrice: CreatorStoreProduct_Price,
  purchasePrice?: CreatorStoreProduct_Price,
  published?: boolean,
  purchasable?: boolean
} & CreatorStoreProduct_OnlyOneId
