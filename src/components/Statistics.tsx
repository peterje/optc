import { Component } from "solid-js";
import { legends } from "~/data/client";
import { getLegendsDataFromJSON, Legend } from "~/data/state";
export const Statistics: Component = () => {
  const numTotalLegends = getLegendsDataFromJSON().orderedIDs.length
  const numUniqueLegends = numTotalLegends - getLegendsDataFromJSON().evolutionIDs.length

  const isEvolution = (legend: Legend) => !!getLegendsDataFromJSON().evolutionIDs.find(l => l == legend.id)
  const isSelected = (legend: Legend) => legend.selected
  const selectedLegends = () => legends().filter(isSelected)
  const selectedUniqueLegends = () => selectedLegends().filter(legend => !isEvolution(legend))
  const rainbowLegends = () => legends().filter(l => l.rainbow)
  const superRainbowLegends = () => legends().filter(l => l.super_rainbow)
  return (
    <div class="flex text-center flex-col justify-center pb-4 font-bold">
      <span class="text-info">Unique Legends - {selectedUniqueLegends().length} / {numUniqueLegends}</span>
      <span class="text-warning">Total Legends - {selectedLegends().length} / {numTotalLegends}</span>
      <span class="text-success">Rainbowed Legends - {rainbowLegends().length} / {numTotalLegends}</span>
      <span class="text-error">Super Rainbowed Legends - {superRainbowLegends().length} / {numTotalLegends}</span>
    </div>
  )
}
