import { createSignal, ParentComponent } from "solid-js"

export const enum Mode {
  Select,
  Rainbow,
  SuperRainbow,
  Remove,
  LLB
}
export const [mode, setMode] = createSignal<Mode>(Mode.Select)

const ModeButton: ParentComponent<{ mode: Mode }> = (props) => (
  <div class="flex items-center pl-3">
    <input onChange={() => { setMode(props.mode) }} id="mode-select" type="radio" value="" checked={mode() === props.mode} name="list-radio" class="radio radio-info" />
    <label for="mode-select" class="w-full py-3 ml-2 text-sm font-medium ">{props.children}</label>
  </div>
)

export const ModeSelect = () => {
  return < div class="flex flex-row justify-center" >
    <ModeButton mode={Mode.Select}>Select Mode</ModeButton>
    <ModeButton mode={Mode.Rainbow}>Rainbow Mode</ModeButton>
    <ModeButton mode={Mode.SuperRainbow}>Super-Rainbow Mode</ModeButton>
    <ModeButton mode={Mode.Remove}>Remove Mode</ModeButton>
    <ModeButton mode={Mode.LLB}>LLB Mode</ModeButton>
  </div >
}
