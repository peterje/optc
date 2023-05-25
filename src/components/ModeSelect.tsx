import { ParentComponent } from "solid-js"
import { ClickHandler, increase_level, set_legend_click_handler, toggle_property } from "~/data/state"

const ModeButton: ParentComponent<{ handler: ClickHandler }> = (props) => (
    <div class="flex items-center pl-3">
        <input onInput={() => { set_legend_click_handler(() => props.handler) }} id="mode-select" type="radio" value="" name="list-radio" class="radio radio-info" />
        <label for="mode-select" class="w-full py-3 ml-2 text-sm font-medium ">{props.children}</label>
    </div>
)

export const ModeSelect = () => (
    <div class="flex flex-row justify-center">
        <ModeButton handler={(id: number) => toggle_property("selected", id)}>Select Mode</ModeButton>
        <ModeButton handler={(id: number) => toggle_property("rainbow", id)}>Rainbow Mode</ModeButton>
        <ModeButton handler={(id: number) => toggle_property("super_rainbow", id)}>Super-Rainbow Mode</ModeButton>
        <ModeButton handler={(id: number) => toggle_property("removed_by_user", id)}>Remove Mode</ModeButton>
        <ModeButton handler={(id: number) => increase_level(id)}>LLB Mode</ModeButton>
    </div>
)