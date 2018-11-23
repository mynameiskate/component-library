import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputValidationService } from "../input-validation/InputValidationService";

@Component({
  selector: 'clb-control-errors',
  templateUrl: './control-errors.component.html'
})
export class ControlErrorsComponent {
  @Input() control: FormControl;

  get errorMessages() {
    const errors = new Array<string>();

    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        const errorMsg = InputValidationService.getValidatorErrorMessage(propertyName,
          this.control.errors[propertyName]);
        errors.push(errorMsg);
      }
    }

    return errors;
  }
}
