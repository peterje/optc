import { For } from "solid-js";
import { LegendIcon } from "~/components/LegendIcon";
import { ModeSelect } from "~/components/ModeSelect";
import { Operations } from "~/components/Operations";
import { Statistics } from "~/components/Statistics";
import { getLegendsDataFromJSON, Legend } from "~/data/state";
import { legends } from "~/data/client"

const sortByOrder = <T extends Legend>(arr: T[], order: string[]): T[] => {
  const orderMap: { [key: string]: number } = {};
  order.forEach((key, index) => {
    orderMap[key] = index;
  });
  return arr.sort((a, b) => {
    const idA = a["id"];
    const idB = b["id"];
    const indexOfA = orderMap[idA];
    const indexOfB = orderMap[idB];
    return indexOfA - indexOfB;
  });
}

const Index = () => {
  return (
    <main class="flex flex-col justify-center justify-items-center text-center items-center">
      <div class="flex flex-col justify-center">
        <span> 2019 - 2023. Created by <a class="link text-warning" href="https://www.reddit.com/user/antonlabz/">antonlabz</a>. Maintained by <a class="link text-warning" href="https://www.reddit.com/message/compose/?to=CubeoHS&amp;subject=OPTC%20Legend%20Checklist">CubeoHS</a> and <a href="https://github.com/peterje" class="link text-warning">peterje</a>.  </span>
        <img src="/img/header.png" class="w-min self-center" alt={'Header image'}></img>
        <Statistics />
        <Operations />
        <ModeSelect />
      </div>
      <div id="legend-grid" class="w-full bg-[url(/img/bg-main.png)] border-2 border-double rounded-md border-yellow-900 grid grid-cols-auto-fit p-8 gap-2 justify-center">
        <For each={sortByOrder(legends(), getLegendsDataFromJSON().orderedIDs)}>
          {(legend) => <LegendIcon legend={legend} />}
        </For >
      </div >
    </main >
  )

}
export default Index
