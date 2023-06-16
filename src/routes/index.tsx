import { For} from "solid-js";
import { LegendIcon } from "~/components/LegendIcon";
import { ModeSelect } from "~/components/ModeSelect";
import { Operations } from "~/components/Operations";
import { Statistics } from "~/components/Statistics";
import { legend_click_handler, legends } from "~/data/state";

export const Index = () => (
  <main class="flex flex-col justify-center justify-items-center text-center items-center">
    <div class="flex flex-col justify-center">
      <img src="/img/header.png" class="w-min self-center"></img>
      <Statistics />
      <Operations />
      <ModeSelect />
    </div>
    <div id="legend-grid" class="w-full bg-[url(/img/bg-main.png)] border-2 border-double rounded-md border-yellow-900 grid grid-cols-auto-fit p-8 gap-2 justify-center">
        <For each={legends}>
            {legend => <LegendIcon hidden={legend.removed_by_user || legend.removed_by_evolution_setting} legend={legend} onClick={legend_click_handler()} />}
        </For>
    </div>
  </main>
)