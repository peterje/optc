import { Component, createSignal } from "solid-js"
import { toast } from "solid-toast"
import { encode, decode } from "base64-arraybuffer"
import html2canvas from "html2canvas"
import { Modal } from "./Modal"
import { Legend, create_legend, evolutions_hidden, legendIDs, legends, reset_all_legends, select_all_legends, set_legends, toggle_property, toggle_show_evolutions, unhide_all_removed_legends, update_cached_legends } from "~/data/state"
import { LegendIcon } from "./LegendIcon"
import { saveAs } from "file-saver"

const [image_saving, set_image_saving] = createSignal(false)
const save_image = () => {
    const level_images = document.getElementsByClassName("level-image")
    console.log(level_images)
    for (let i = 0; i < level_images.length; i++) {
        level_images[i].classList.add("hidden")
    }
    html2canvas(document.querySelector("#legend-grid") as HTMLDivElement, {scale: 1.5}).then(canvas => canvas.toBlob((image) => saveAs(image!, "legends.png"))).finally(() => set_image_saving(false))
    for (let i = 0; i < level_images.length; i++) {
        level_images[i].classList.remove("hidden")
    }
}

const [import_code, set_import_code] = createSignal("")
const export_share_code = () => navigator.clipboard.writeText(encode_legends(legends))
export const add_missing_legends = () => {
    const new_legends = [...legends]
    const existing_legends = new Set(legends.map((legend) => legend.id))
    const missing_legends = legendIDs.filter((id) => !existing_legends.has(id))
    for(const missing_legend of missing_legends) {
        new_legends.push(create_legend(missing_legend))
    }
    set_legends(new_legends)
    update_cached_legends()
}
const import_share_code = (share_code: string) => {
    const decoded_legends = decode_legends(share_code)
    // we are missing legends ???
    const decoded_ids = decoded_legends.map((legend) => legend.id)
    const existing_legends = new Set(legends.map((legend) => legend.id))

    const duplicated_ids = decoded_ids.filter((id) => !existing_legends.has(id))

    const missing_legends = legendIDs.filter((id) => !existing_legends.has(id))

    for(const missing_legend of missing_legends) {
        decoded_legends.push(create_legend(missing_legend))
    }
    set_legends(decoded_legends)
    update_cached_legends()
}

const encode_legends = (legends: Legend[]) => encode(new TextEncoder().encode(JSON.stringify(legends)))
const decode_legends = (encoded: string) => {
    return JSON.parse(new TextDecoder().decode(decode(encoded))) as Legend[]
}

export const Operations: Component = () =>
(
    <div class="flex flex-col xl:flex-row justify-center gap-2 ">
        <button class="btn btn-outline btn-success" onclick={select_all_legends}>Select All</button>
        <button class="btn btn-outline btn-info" onclick={toggle_show_evolutions}>{evolutions_hidden() ? "Show" : "Hide"} ★6 Forms of Super-Evos</button>
        <button class="btn btn-outline btn-info" onclick={unhide_all_removed_legends}>Unhide All Removed Legends</button>
        <label class="btn btn-outline btn-info" for="removed-legends-modal" >List Removed Legends</label>
        <button class="btn btn-outline btn-info" onclick={save_image} classList={{ 'loading': image_saving() }}>Generate Image</button>
        <button class="btn btn-outline btn-info" onclick={() => { export_share_code(); toast.success("Saved share code to clipboard") }}>Export Share Code</button>
        <label for="share-code-modal" class="btn btn-outline btn-info">Import Share Code</label>
        <button class="btn btn-outline btn-error" onclick={reset_all_legends}>Reset All</button>
        <Modal id="share-code-modal">
            <h3 class="font-bold text-lg">Import Share Code</h3>
            <textarea class="textarea textarea-info" placeholder="Enter your share code here" onInput={(e) => { set_import_code(e.currentTarget.value) }}></textarea>
            <div class="modal-action">
                <label for="share-code-modal" class="btn btn-error">Cancel</label>
                <label for="share-code-modal" class="btn btn-info" onclick={() => { import_share_code(import_code()) }}>Import</label>
            </div>
        </Modal>
        <Modal id="removed-legends-modal">
            <h3 class="font-bold text-lg">Removed Legends</h3>
            <p class="py-4">Click icons to unhide legends</p>
            <div class='grid grid-cols-5 gap-4'>
                {legends.filter(legend => legend.removed_by_user === true).map((legend) => <LegendIcon hidden={false} legend={legend} onClick={() => toggle_property("removed_by_user", legend.id)} />)}
            </div>
            <div class="modal-action">
                <label for="removed-legends-modal" class="btn btn-error">Cancel</label>
            </div>
        </Modal>
    </div>
)