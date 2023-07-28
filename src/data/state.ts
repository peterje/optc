import { objectKeys } from "ts-extras"
import json from "~/data/legends.json"
export type Legend = {
  id: string
  level: number
  selected: boolean
  rainbow: boolean
  super_rainbow: boolean
  removed_by_user: boolean
  removed_by_evolution_setting: boolean // Deprecated
}

export const createLegend = (id: string): Legend => ({
  id,
  level: 0,
  selected: false,
  rainbow: false,
  super_rainbow: false,
  removed_by_user: false,
  removed_by_evolution_setting: false
})
export const by = <T extends Legend>(arr: T[], P: (value: T) => boolean, f: (value: T) => T): T[] => arr.map(x => P(x) ? f(x) : x)


export type LegendAPIResponse = {
  orderedIDs: string[]
  baseIDs: string[]
  evolutionIDs: string[]
  evolutionMap: Record<string, string[]>
}
export const getLegendsDataFromJSON = () => {
  const response: LegendAPIResponse = {
    orderedIDs: [],
    baseIDs: [],
    evolutionIDs: [],
    evolutionMap: json
  }
  for (const baseformID of objectKeys(json)) {
    response.orderedIDs.push(baseformID)
    const evolutionIDsForBase = json[baseformID]
    if (evolutionIDsForBase.length > 0) {
      response.baseIDs.push(baseformID)
    }
    response.evolutionIDs.push(...evolutionIDsForBase)
    response.orderedIDs.push(...evolutionIDsForBase)
  }
  return response
}

export type Settings = {
  hideBaseForms: boolean
}

