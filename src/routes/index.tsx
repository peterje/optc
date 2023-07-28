import { For, createEffect, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { LegendIcon } from "~/components/LegendIcon";
import { ModeSelect } from "~/components/ModeSelect";
import { Operations } from "~/components/Operations";
import { Statistics } from "~/components/Statistics";
import { Legend, Settings, createLegend } from "~/data/state";
import { LegendAPIResponse } from "./api/legends";

const getSupportedLegends = async () => {
  const response = await fetch("/api/legends")
  return (await response.json()) as LegendAPIResponse
}

export function routeData() {
  const [supportedLegends] = createResource(getSupportedLegends)
  const [localStorageLegends, { mutate: mutateLegends }] = createResource(async () => {
    const savedData = localStorage.getItem("legends")
    if (savedData) return JSON.parse(savedData) as Legend[]
    const newSaveData: Legend[] = (await getSupportedLegends()).orderedIDs.map(createLegend)
    localStorage.setItem("legends", JSON.stringify(newSaveData))
    return newSaveData
  })
  const [localStorageSettings, { mutate: mutateSettings }] = createResource(async () => {
    const savedSettings = localStorage.getItem("settings")
    if (savedSettings) return JSON.parse(savedSettings) as Settings
    const newSettings: Settings = { hideBaseForms: false }
    localStorage.setItem("settings", JSON.stringify(newSettings))
    return newSettings
  })
  return { supportedLegends, localStorageLegends, localStorageSettings, mutateSettings, mutateLegends }
}

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
  const { supportedLegends, localStorageLegends, localStorageSettings: settings } = useRouteData<typeof routeData>();
  const isLoading = !supportedLegends.latest || !settings.latest || !localStorageLegends.latest
  console.log(supportedLegends.latest, supportedLegends.error)
  console.log(settings.latest, settings.error)
  console.log(localStorageLegends.latest, localStorageLegends.error)
  if (isLoading) return <span class="loading loading-spinner loading-md"></span>
  createEffect(() => { localStorage.setItem("settings", JSON.stringify(settings())) })
  createEffect(() => { localStorage.setItem("legends", JSON.stringify(localStorageLegends())) })
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
        <For each={sortByOrder(localStorageLegends(), supportedLegends().orderedIDs)}>
          {(legend) => <LegendIcon legend={legend} />}
        </For >
      </div >
    </main >
  )

}
export default Index
