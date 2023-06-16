import { Component } from "solid-js";
import { legends, is_evolution, num_total_legends, num_unique_legends } from "~/data/state";
const selected_base_legends = () => legends.filter((legend) => legend.selected && !is_evolution(legend.id))
const selected_evolution_legends = () => legends.filter((legend) => legend.selected && is_evolution(legend.id))
const rainbow_legends = () => legends.filter((legend) => legend.rainbow)
const super_rainbow_legends = () => legends.filter((legend) => legend.super_rainbow)
export const Statistics: Component = () =>
(
    <div class="flex text-center flex-col justify-center pb-4 font-bold">
        <span class="text-info">Unique Legends - {selected_base_legends().length} / {num_unique_legends}</span>
        <span class="text-warning">Total Legends - {selected_base_legends().length + selected_evolution_legends().length} / {num_total_legends}</span>
        <span class="text-success">Rainbowed Legends - {rainbow_legends().length} / {num_total_legends}</span>
        <span class="text-error">Super Rainbowed Legends - {super_rainbow_legends().length} / {num_total_legends}</span>
    </div>
)