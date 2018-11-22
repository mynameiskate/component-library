import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputValidationService } from "../../../showcase/input-validation/InputValidationService";

@Component({
  selector: 'control-errors',
  templateUrl: './control-errors.component.html'
})
export class ControlErrors {
  @Input() control: FormControl;

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return InputValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
