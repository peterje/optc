import { For, createEffect, createSignal } from "solid-js";
import { LegendIcon } from "~/components/LegendIcon";
import { ModeSelect } from "~/components/ModeSelect";
import { Operations } from "~/components/Operations";
import { Statistics } from "~/components/Statistics";
import { Legend, evolution_map, legend_click_handler, legends, legendIDs, baseIDs } from "~/data/state";
import { rendered_legends, set_rendered_legends } from "~/data/state";



export const Index = () => {
  createEffect(() => {
    const new_order = []
    for (const unit_id of baseIDs) {
      const evolution_ids = evolution_map[unit_id] as number[]
      const legend = legends.find(l => l.id == unit_id) as Legend
      new_order.push(legend)
      for (const evolution_id of evolution_ids) {
        const evolution = legends.find(l => l.id == evolution_id) as Legend
        new_order.push(evolution)
      }
    }
    set_rendered_legends(new_order)
  })
  return (
    <main class="flex flex-col justify-center justify-items-center text-center items-center">
      <div class="flex flex-col justify-center">
        <span> 2019 - 2023. Created by <a class="link text-warning" href="https://www.reddit.com/user/antonlabz/">antonlabz</a>. Maintained by <a class="link text-warning" href="http://www.reddit.com/message/compose/?to=CubeoHS&amp;subject=OPTC%20Legend%20Checklist">CubeoHS</a> and <a href="https://github.com/peterje" class="link text-warning">peterje</a>.  </span>
        <img src="/img/header.png" class="w-min self-center"></img>
        <Statistics />
        <Operations />
        <ModeSelect />
      </div>
      <div id="legend-grid" class="w-full bg-[url(/img/bg-main.png)] border-2 border-double rounded-md border-yellow-900 grid grid-cols-auto-fit p-8 gap-2 justify-center">
        <For each={rendered_legends()}>
          {(legend) => (<LegendIcon hidden={legend.removed_by_user || legend.removed_by_evolution_setting} legend={legend} onClick={legend_click_handler()} />)}
        </For >
      </div>
    </main>
  )

}