import { makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";
import { createLegend, getLegendsDataFromJSON, Legend, Settings } from "./state";

const defaultSettings: Settings = { hideBaseForms: false }
const defaultLegends: Legend[] = getLegendsDataFromJSON().orderedIDs.map(createLegend)
export const [settings, setSettings] = makePersisted<Settings>(createSignal(defaultSettings), { storage: localStorage });
export const [legends, setLegends] = makePersisted<Legend[]>(createSignal(defaultLegends), { storage: localStorage });
