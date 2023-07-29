import {Component, createEffect, createSignal} from "solid-js";
import { legends } from "~/data/client";
import { Legend, evolutionToBase, baseIDs, evolutionIDs, evolutionMap } from "~/data/state";
export const Statistics: Component = () => {
  const numTotalLegends = Object.keys(evolutionMap).length + evolutionIDs.size
  const numUniqueLegends = numTotalLegends - evolutionIDs.size
  const isSelected = (legend: Legend) => legend.selected || legend.rainbow || legend.super_rainbow
  const selectedLegends = () => legends().filter(isSelected)
    const getUniqueCount = (legends: Legend[]) => {
      let count = 0
      const countedBaseIDs = new Set<string>()
      for(const legend of legends){
          if(!isSelected(legend)) continue
          const rootId = getRootID(legend.id)
          if(!countedBaseIDs.has(rootId)){
              countedBaseIDs.add(rootId)
              count++
          }
      }
      return count
    }
    function getRootID(id: string){
      if(!baseIDs.has(id) && !evolutionIDs.has(id)) return id // Singular legends, no evos
      if(baseIDs.has(id)) return id // 6star form of evos
      return evolutionToBase.get(id) as string // evos
    }


  const rainbowLegends = () => legends().filter(l => l.rainbow || l.super_rainbow)
  const superRainbowLegends = () => legends().filter(l => l.super_rainbow)
  return (
    <div class="flex text-center flex-col justify-center pb-4 font-bold">
      <span class="text-info">Unique Legends - {getUniqueCount(legends())} / {numUniqueLegends}</span>
      <span class="text-warning">Total Legends - {selectedLegends().length} / {numTotalLegends}</span>
      <span class="text-success">Rainbowed Legends - {rainbowLegends().length} / {numTotalLegends}</span>
      <span class="text-error">Super Rainbowed Legends - {superRainbowLegends().length} / {numTotalLegends}</span>
    </div>
  )
}
