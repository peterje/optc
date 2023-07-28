import { Component } from "solid-js";
import { useRouteData } from "solid-start";
import { routeData } from "~/routes";
import { Legend } from "~/data/state";
export const Statistics: Component = () => {
  const { localStorageLegends: legends, supportedLegends } = useRouteData<typeof routeData>()
  if (!legends.latest || !supportedLegends.latest) return
  const numUniqueLegends = supportedLegends().orderedIDs.length - supportedLegends().evolutionIDs.length
  const numTotalLegends = supportedLegends().orderedIDs.length
  const isBase = (legend: Legend) => !!supportedLegends().baseIDs.find(l => l == legend.id)
  const isSelected = (legend: Legend) => legend.selected
  const selectedLegends = () => legends().filter(isSelected)
  const selectedBaseLegends = () => selectedLegends().filter(isBase)
  const rainbowLegends = () => legends().filter(l => l.rainbow)
  const superRainbowLegends = () => legends().filter(l => l.super_rainbow)
  return (
    <div class="flex text-center flex-col justify-center pb-4 font-bold">
      <span class="text-info">Unique Legends - {selectedBaseLegends().length} / {numUniqueLegends}</span>
      <span class="text-warning">Total Legends - {selectedLegends().length} / {numTotalLegends}</span>
      <span class="text-success">Rainbowed Legends - {rainbowLegends().length} / {numTotalLegends}</span>
      <span class="text-error">Super Rainbowed Legends - {superRainbowLegends().length} / {numTotalLegends}</span>
    </div>
  )
}
