
# creatorStoreProductInfo


## Parameters
| Name              | Type  | Description                                                       |
| :---------------- | :---- | :---------------------------------------------------------------- |
| modelAssetId      |       | Use this if the creator product you are getting is a model.       |
| pluginAssetId     |       | Use this if the creator product you are getting is a plugin.      |
| audioAssetId      |       | Use this if the creator product you are getting is an audio.      |
| decalAssetId      |       | Use this if the creator product you are getting is a decal.       |
| meshPartAssetId   |       | Use this if the creator product you are getting is a mesh part.   |
| videoAssetId      |       | Use this if the creator product you are getting is a video.       |
| fontFamilyAssetId |       | Use this if the creator product you are getting is a font family. |



## Example
```js copy showLineNumbers
const { data: productInfo } = await CreatorStoreApi.creatorStoreProductInfo({ modelAssetId: 16989381169 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/creator-store-products/{productId}
```
  