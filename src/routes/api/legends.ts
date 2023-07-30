import { getLegendsDataFromJSON } from "~/data/state"
export const GET = () => new Response(JSON.stringify(getLegendsDataFromJSON()))
