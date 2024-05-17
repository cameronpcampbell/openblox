// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "../../../utils/utils.types"
import type {  } from "./standardDataStores_V1.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "Messaging", baseUrl: "https://apis.roblox.com/datastores" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Returns a list of data stores belonging to an experience.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param prefix Provide to return only data stores with this prefix.
 * @param limit The maximum number of items to return. Each call only reads one partition so it can return fewer than the given value when running out of objectives on one partition.
 * @param cursor Provide to request the next set of data.
 * 
 * @example const { data:datastores } = await StandardDatastoresApi.listStandardDatastores(5097539509)
 * @exampleData [ { name: "InventoryStore", createdTime: 2023-09-16T11:03:03.868Z } ]
 * @exampleRawBody { datastores: [ { name: "InventoryStore", createdTime: "2023-09-16T11:03:03.868331Z" } ], nextPageCursor: "" }
 */