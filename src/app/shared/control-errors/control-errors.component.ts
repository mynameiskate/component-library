import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'clb-control-errors',
  templateUrl: './control-errors.component.html'
})
export class ControlErrorsComponent {
  @Input() control: FormControl;

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const errorTable = {
      min: `Minimum value is ${validatorValue.min}`,
      max: `Maximum value is ${validatorValue.max}`,
      required: 'Field is required',
      randomError: 'Sorry, but random generator thinks otherwise',
      minlength: `Minimum length is ${validatorValue.requiredLength}`,
      maxlength: `Maximum length is ${validatorValue.requiredLength}`,
      email: 'Incorrect email format',
      pattern: `Required format is ${validatorValue.requiredPattern}`
    };

    return errorTable.hasOwnProperty(validatorName)
      ? errorTable[validatorName]
      : validatorValue;
  }

  get errorMessages() {
    const errors = new Array<string>();

    for (let propertyName in this.control.errors) {
      if (this.control.dirty && this.control.errors.hasOwnProperty(propertyName)) {
        const errorMsg = this.getValidatorErrorMessage(propertyName,
          this.control.errors[propertyName]);
        errors.push(errorMsg);
      }
    }

    return errors;
  }
}
