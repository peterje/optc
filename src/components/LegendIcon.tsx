import { Legend } from "~/data/state"
export const LegendIcon = (props: { hidden: boolean, legend: Legend, onClick: (legend_id: number) => void }) => {
    const legend = props.legend
    return (
        <div class="relative" classList={{ "icon-selected": legend.selected, "icon-rainbow": legend.rainbow, "icon-super-rainbow": legend.super_rainbow, "icon-removed": props.hidden, "opacity-50 hover:opacity-80": !legend.selected && !legend.rainbow && !legend.super_rainbow }}>
            <img class="w-full h-full aspect-square cursor-pointer" src={`/img/${legend.id}.png`} onClick={() => props.onClick(legend.id)} />
            <img class="level-image absolute top-0 right-0 w-6" src={`/img/level.png`} />
            <span class="absolute top-[0px] right-[8px] text-sm text-white text-shadow">{legend.level}</span>
        </div>
    )
}