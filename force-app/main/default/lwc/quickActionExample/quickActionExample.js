import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ParentComponent extends LightningElement {
    isDialogVisible = false;

    handleClick() {
        this.isDialogVisible = true;
    }

    handleDialogResponse(event) {
        const userResponse = event.detail.response;

        if (userResponse) {
            // proceed
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Confirmed!",
                    variant: "success"
                })
            );

            this.isDialogVisible = false;
            return;
        }

        // cancel;
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Cancelled!",
                variant: "info"
            })
        );

        this.isDialogVisible = false;
    }
}
