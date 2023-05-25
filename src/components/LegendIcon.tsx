import { Legend } from "~/data/state"
export const LegendIcon = (props: { hidden: boolean, legend: Legend, onClick: (legend_id: number) => void }) => {
    const legend = props.legend
    return (
        <div class="relative hover:opacity-100" classList={{ "icon-selected": legend.selected, "icon-rainbow": legend.rainbow, "icon-super-rainbow": legend.super_rainbow, "icon-removed": props.hidden, "opacity-50": !legend.selected && !legend.rainbow && !legend.super_rainbow }}>
            <img class="w-full h-full aspect-square cursor-pointer" src={`/img/${legend.id}.png`} onClick={() => props.onClick(legend.id)} />
            <img class="absolute top-0 right-0 w-6" src={`/img/level.png`} />
            <span class="absolute top-[0px] right-[8px] text-sm text-white">{legend.level}</span>
        </div>
    )
}