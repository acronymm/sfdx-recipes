import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ParentComponent extends LightningElement {
    isDialogVisible = false;

    // lifecycle hooks
    renderedCallback() {
        const style = document.createElement("style");
        style.innerText = `.slds-modal__container {
            width: 90% !important;
            max-width: 90% !important;
        }`;
        this.template.querySelector("lightning-quick-action-panel").appendChild(style);
    }

    // event handlers
    handleClick() {
        this.isDialogVisible = true;
    }

    handleDialogResponse(event) {
        const userResponse = event.detail.response;
        this.isDialogVisible = false;

        if (userResponse) {
            // confirmed
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Confirmed!",
                    variant: "success"
                })
            );

            return;
        }

        // cancelled
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Cancelled!",
                variant: "info"
            })
        );
    }
}
