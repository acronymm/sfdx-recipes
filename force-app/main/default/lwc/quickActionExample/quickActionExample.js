import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ParentComponent extends LightningElement {
    isDialogVisible = false;

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
