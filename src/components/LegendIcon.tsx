import { useRouteData } from "solid-start"
import { Legend, by } from "~/data/state"
import { routeData } from "~/routes"
import { mode, Mode } from "./ModeSelect"
import { mergeProps } from "solid-js"

export const LegendIcon = (props: { legend: Legend, onClick?: (legend_id: string) => void, forceShow?: boolean }) => {
  const legend = props.legend
  const { supportedLegends, localStorageSettings: settings, localStorageLegends: legends, mutateLegends: mutate } = useRouteData<typeof routeData>()
  const isBaseForm = (legendID: string): boolean => !!supportedLegends.latest?.baseIDs.find(id => id === legendID)
  if (!legends.latest) return
  const defaultClickHandler = (id: string) => {
    switch (mode()) {
      case Mode.Select: mutate(by(legends(), l => l.id === id, l => ({ ...l, selected: !l.selected }))); break
      case Mode.Remove: mutate(by(legends(), l => l.id === id, l => ({ ...l, removed_by_user: true }))); break
      case Mode.SuperRainbow: mutate(by(legends(), l => l.id === id, l => ({ ...l, super_rainbow: !l.super_rainbow }))); break
      case Mode.Rainbow: mutate(by(legends(), l => l.id === id, l => ({ ...l, rainbow: !l.rainbow }))); break
      case Mode.LLB: mutate(by(legends(), l => l.id === id, l => ({ ...l, level: (l.level + 1) % 6 }))); break
      default: break
    }
  }
  const merged = mergeProps({ onClick: defaultClickHandler, forceShow: false })
  return (
    <div class="relative" classList={{
      "icon-selected": legend.selected,
      "icon-rainbow": legend.rainbow,
      "icon-super-rainbow": legend.super_rainbow,
      "icon-removed": !merged.forceShow && (legend.removed_by_user || (isBaseForm(legend.id) && settings.latest?.hideBaseForms)),
      "opacity-50 hover:opacity-80": !legend.selected && !legend.rainbow && !legend.super_rainbow
    }}>
      <img class="w-full h-full aspect-square cursor-pointer" src={`/img/${legend.id}.png`} onClick={() => merged.onClick(legend.id)} />
      <img class="level-image absolute top-0 right-0 w-6" src={`/img/level.png`} />
      <span class="absolute top-[0px] right-[8px] text-sm text-white text-shadow">{legend.level}</span>
    </div>
  )
}
