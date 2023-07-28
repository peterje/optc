import { ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";

export const Modal: ParentComponent<{ id: string }> = (props) =>
(
  <Portal>
    <input type="checkbox" id={props.id} class="modal-toggle" />
    <div class="modal">
      <div class="modal-box flex flex-col space-y-4">
        {props.children}
      </div>
    </div>
  </Portal>
)
