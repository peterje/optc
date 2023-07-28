
import { createSignal } from "solid-js"
import { Part, createStore } from "solid-js/store"
import { add_missing_legends } from "~/components/Operations"
import legend_mapping from "~/data/legends.json"


/* Constants */
const MAX_LEVEL = 5

/* Data Types */
export type ClickHandler = (id: number) => void
export type Legend = {
    id: number
    level: number
    selected: boolean
    rainbow: boolean
    super_rainbow: boolean
    removed_by_user: boolean
    removed_by_evolution_setting: boolean
}


export type LegendCache = Record<number, Legend>
export const build_cache = (): LegendCache => {
    const new_cache: LegendCache = {}
    legends.forEach((legend: Legend) => {
        new_cache[legend.id] = legend
    })
    return new_cache
}


export type LegendEntry = {
    baseID: number
    evolutionIDs: number[]
}

export const evolution_map: Record<keyof typeof legend_mapping, number[]> = legend_mapping

export const create_legend = (legend_id: number): Legend => ({ id: legend_id, level: 0, rainbow: false, super_rainbow: false, selected: false, removed_by_user: false, removed_by_evolution_setting: false })

/* Global State */
export const [legend_click_handler, set_legend_click_handler] = createSignal<ClickHandler>((id: number) => toggle_property("selected", id))

type LegendID = keyof typeof legend_mapping
const evolutionIDs = Object.values(legend_mapping).flat() as number[]
export const baseIDs = Object.keys(legend_mapping) as LegendID[]
export const legendIDs = baseIDs.concat(evolutionIDs)

const baseformIDs = []
for(const baseID of baseIDs){
    if(legend_mapping[baseID].length > 0){
        baseformIDs.push(baseID)
    }
}
export const [legends, set_legends] = createStore<Legend[]>(legendIDs.map((id) => create_legend(id)));
export const [evolutions_hidden, set_evolutions_hidden] = createSignal(JSON.parse(localStorage.getItem("evolutions_hidden") ?? "false"))
export const num_unique_legends = baseIDs.length
export const num_total_legends = legendIDs.length

const evo_set: Set<number> = new Set(baseformIDs.map(Number))
export const is_evolution = (id: number): boolean => evo_set.has(id)
const is_client = typeof window !== 'undefined'
const cached_legends = is_client ? localStorage.getItem("legends") : null
export const [rendered_legends, set_rendered_legends] = createSignal<Legend[]>([])

export const build_rendered_legends = () => {
        const new_order = []
        for (const unit_id of baseIDs) {
            const evolution_ids = evolution_map[unit_id] as number[]
            const legend = legends.find(l => l.id == unit_id) as Legend
            new_order.push(legend)
            for (const evolution_id of evolution_ids) {
                const evolution = legends.find(l => l.id == evolution_id) as Legend
                if (evolution == undefined) continue
                new_order.push(evolution)
            }
        }
        set_rendered_legends(new_order)
}

export const update_cached_legends = () => {
    if (is_client) {
        build_rendered_legends()
        localStorage.setItem("legends", JSON.stringify(legends))
    }
}
if (cached_legends) {
    set_legends(JSON.parse(cached_legends))
    // Determine if show evolutions is on from cached legends
    const cached_evolutions = JSON.parse(cached_legends).filter((legend: Legend) => is_evolution(legend.id))
    const all_removed_by_evolution_setting = cached_evolutions.some((legend: Legend) => legend.removed_by_evolution_setting)
    set_evolutions_hidden(all_removed_by_evolution_setting)
    add_missing_legends()
}
build_rendered_legends()

/* Atomic State Operations */
export const reset_all_legends = () => {
    set_legends((legends) => legends.map((legend) => create_legend(legend.id)))
    update_cached_legends()
}
export const toggle_property = (property: Part<Legend>, id?: number) => {
    if (id) set_legends(e => e.id === id, property, v => !v)
    else set_legends(e => true, property, v => !v)
    update_cached_legends()
}
export const increase_level = (id: number) => {
    set_legends(e => e.id === id, "level", v => (v + 1) % (MAX_LEVEL + 1))
    update_cached_legends()
}
export const unhide_all_removed_legends = () => {
    set_legends(() => true, "removed_by_user", () => false)
    update_cached_legends()
}
export const select_all_legends = () => {
    set_legends(() => true, "selected", () => true)
    update_cached_legends()
}
export const toggle_show_evolutions = () => {
    set_evolutions_hidden((v) => !v)
    set_legends((e) => is_evolution(e.id), "removed_by_evolution_setting", v => !v)
    update_cached_legends()
}