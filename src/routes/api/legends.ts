import legends from "~/data/legends.json"
import { objectKeys } from "ts-extras"

export type LegendAPIResponse = {
  orderedIDs: string[]
  baseIDs: string[]
  evolutionIDs: string[]
  evolutionMap: Record<string, string[]>
}
export const GET = () => {
  const response: LegendAPIResponse = {
    orderedIDs: [],
    baseIDs: [],
    evolutionIDs: [],
    evolutionMap: legends
  }
  for (const baseformID of objectKeys(legends)) {
    response.orderedIDs.push(baseformID)
    const evolutionIDsForBase = legends[baseformID]
    if (evolutionIDsForBase.length > 0) {
      response.baseIDs.push(baseformID)
    }
    response.evolutionIDs.push(...evolutionIDsForBase)
    response.orderedIDs.push(...evolutionIDsForBase)
  }
  return new Response(JSON.stringify(response))
}
