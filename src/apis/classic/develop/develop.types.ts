// [ Types ] /////////////////////////////////////////////////////////////////////
import { Identifier, ISODateTime, ObjectPrettify } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////


// [ Friends ] ///////////////////////////////////////////////////////////////////
// GET /v1/universes/{universeId}/places -----------------------------------------
export type PrettifiedUniversePlacesData<UniverseId extends Identifier> = {
  id: Identifier,
  universeId: UniverseId,
  name: string,
  description: string
}[]

export type RawUniversePlacesData<UniverseId extends Identifier> = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: PrettifiedUniversePlacesData<UniverseId>
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////
