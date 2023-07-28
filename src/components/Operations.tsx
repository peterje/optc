import { Component, createSignal, For } from "solid-js"
import { toast } from "solid-toast"
import { encode, decode } from "base64-arraybuffer"
import html2canvas from "html2canvas"
import { Modal } from "./Modal"
import { Legend, createLegend, by } from "~/data/state"
import { legends, settings, setLegends, setSettings } from "~/data/client"
import { LegendIcon } from "./LegendIcon"
import { saveAs } from "file-saver"

const save_image = () => {
  const level_images = document.getElementsByClassName("level-image")
  for (let i = 0; i < level_images.length; i++) {
    level_images[i].classList.add("hidden")
  }
  html2canvas(document.querySelector("#legend-grid") as HTMLDivElement, { scale: 1.5 }).then(canvas => canvas.toBlob((image) => saveAs(image!, "legends.png"))).finally(() => set_image_saving(false))
  for (let i = 0; i < level_images.length; i++) {
    level_images[i].classList.remove("hidden")
  }
}
const [image_saving, set_image_saving] = createSignal(false)
const [import_code, set_import_code] = createSignal("")
const export_share_code = (legends: Legend[]) => navigator.clipboard.writeText(encode_legends(legends))
const encode_legends = (legends: Legend[]) => encode(new TextEncoder().encode(JSON.stringify(legends)))
const decode_legends = (encoded: string) => JSON.parse(new TextDecoder().decode(decode(encoded))) as Legend[]
export const Operations: Component = () => {


  const import_share_code = (share_code: string) => {
    const decoded_legends = decode_legends(share_code)
    setLegends(decoded_legends)
  }
  return (
    <div class="flex flex-col xl:flex-row justify-center gap-2 ">
      <button class="btn btn-outline btn-success" onclick={() => setLegends(by(legends(), () => true, l => ({ ...l, selected: true })))}>Select All</button>
      <button class="btn btn-outline btn-info" onclick={() => setSettings({ hideBaseForms: !settings().hideBaseForms })}>{settings().hideBaseForms ? "Show" : "Hide"} ★6 Forms of Super-Evos</button>
      <button class="btn btn-outline btn-info" onclick={() => setLegends(by(legends(), l => l.removed_by_user, l => ({ ...l, removed_by_user: false })))}>Unhide All Removed Legends</button>
      <label class="btn btn-outline btn-info" for="removed-legends-modal" >List Removed Legends</label>
      <button class="btn btn-outline btn-info" onclick={save_image} classList={{ 'loading': image_saving() }}>Generate Image</button>
      <button class="btn btn-outline btn-info" onclick={() => { export_share_code(legends()); toast.success("Saved share code to clipboard") }}>Export Share Code</button>
      <label for="share-code-modal" class="btn btn-outline btn-info">Import Share Code</label>
      <button class="btn btn-outline btn-error" onclick={() => setLegends(by(legends(), () => true, (l) => createLegend(l.id)))}>Reset All</button>
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
          <For each={legends().filter(l => l.removed_by_user)}>
            {(legend) => (<LegendIcon forceShow={true} legend={legend} onClick={() => setLegends(by(legends(), l => l.id === legend.id, l => ({ ...l, removed_by_user: false })))} />)}
          </For>
        </div>
        <div class="modal-action">
          <label for="removed-legends-modal" class="btn btn-error">Cancel</label>
        </div>
      </Modal>
    </div >
  )
}
