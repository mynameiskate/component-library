import { Component, ElementRef, ViewChild, OnChanges, Input } from '@angular/core';

import { AbstractValueAccessor, CreateAccessorProvider } from '../shared/control-value-accessor/AbstractControlValueAccessor';
import { IInputValidationService } from "../shared/validation-service/IInputValidationService";

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.html',
  providers: [CreateAccessorProvider(CustomInputComponent)]
})
export class CustomInputComponent extends AbstractValueAccessor<string> {
  @Input() inputLabel: string;
  @Input() errorMessages: Array<string> = [];
  @Input() validationService: IInputValidationService;

  @ViewChild('element') element: ElementRef;

  isValid: boolean = true;

  writeValue(value: string) {
    this.element.nativeElement.innerText = value;
    this.value = value;
  }

  validate(value: string) {
    if (this.validationService) {
      const valRes = this.validationService.validate(value);
      this.isValid = valRes === null;

      if (!this.isValid) {
        this.errorMessages = [...valRes];
      }
    }
  }


  updateValue() {
    const value = this.element.nativeElement.innerText;
    this.validate(value);
    this.onChangeCallback(value);
  }
}

