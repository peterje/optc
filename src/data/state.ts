
import { createSignal } from "solid-js"
import { Part, createStore } from "solid-js/store"
import legendIDs from "~/data/flairs.json"
import evolutions from "~/data/evolutions.json"

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

const create_legend = (legend_id: number): Legend => ({ id: legend_id, level: 0, rainbow: false, super_rainbow: false, selected: false, removed_by_user: false, removed_by_evolution_setting: false })

/* Global State */
export const [legend_click_handler, set_legend_click_handler] = createSignal<ClickHandler>((id: number) => toggle_property("selected", id))

export const [legends, set_legends] = createStore<Legend[]>(legendIDs.map((id) => create_legend(id)));
export const [evolutions_hidden, set_evolutions_hidden] = createSignal(false)
const evolution_ids: Set<number> = new Set(evolutions.map(entry => entry.baseID))
export const num_unique_legends = legendIDs.length - evolution_ids.size
export const num_total_legends = legendIDs.length
export const is_evolution = (id: number): boolean => evolution_ids.has(id)
const is_client = typeof window !== 'undefined'
const cached_legends = is_client ? localStorage.getItem("legends") : null
export const update_cached_legends = () => {
    if (is_client) {
        localStorage.setItem("legends", JSON.stringify(legends))
    }
}
if (cached_legends) {
    set_legends(JSON.parse(cached_legends))
    // Determine if show evolutions is on from cached legends
    const cached_evolutions = JSON.parse(cached_legends).filter((legend: Legend) => is_evolution(legend.id))
    const all_removed_by_evolution_setting = cached_evolutions.every((legend: Legend) => legend.removed_by_evolution_setting)
    set_evolutions_hidden(all_removed_by_evolution_setting)

    // Determine if there are any new legends that need to be added to the cache
    const current_legend_ids = new Set(JSON.parse(cached_legends).map((legend: Legend) => legend.id))
    const missing_legend_ids = legendIDs.filter((id: number) => !current_legend_ids.has(id))
    if (missing_legend_ids.length > 0) {
        const missing_legends = missing_legend_ids.map((id: number) => create_legend(id))
        const updated_legends = JSON.parse(cached_legends).concat(missing_legends)
        set_legends(updated_legends)
        update_cached_legends()
    }
}


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