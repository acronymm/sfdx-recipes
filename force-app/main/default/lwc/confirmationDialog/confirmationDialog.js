import { LightningElement, api } from "lwc";
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from "lightning/flowSupport";

export default class ConfirmationDialog extends LightningElement {
    @api isFlow = false;
    @api visible; // used to hide/show dialog
    @api showTitle = false;
    @api title = "Custom Dialog"; // modal title
    @api message; // modal message
    @api confirmLabel = "Yes"; // confirm button label
    @api cancelLabel = "No"; // cancel button label
    @api response; // used to convey user's response to Flow

    // getters
    get dialogBodyClasses() {
        const classes = "slds-modal__content slds-var-p-around_x-large";
        if (this.showTitle) {
            return classes;
        }

        return classes + " round-borders";
    }

    //handles button clicks
    handleClick(event) {
        // get a boolean value of user's response.
        // confirmation = true, rejection = false.
        const userResponse = event.target.name === this.confirmLabel;
        if (!this.isFlow) {
            this.dispatchEvent(new CustomEvent("response", { detail: { response: userResponse } }));
            return;
        }

        const attributeChangeEvent = new FlowAttributeChangeEvent("response", userResponse);
        const navigateNextEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(attributeChangeEvent);
        this.dispatchEvent(navigateNextEvent);
    }
}
