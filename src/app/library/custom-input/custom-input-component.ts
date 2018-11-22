import { Component, ElementRef, ViewChild, OnChanges, Input } from '@angular/core';

import { AbstractValueAccessor, CreateAccessorProvider } from '../shared/control-value-accessor/AbstractControlValueAccessor';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.html',
  providers: [CreateAccessorProvider(CustomInputComponent)]
})
export class CustomInputComponent extends AbstractValueAccessor<string> {
  @Input() inputLabel: string;
  @Input() maxLength: number;

  @ViewChild('element') element: ElementRef;

  writeValue(value: string) {
    this.element.nativeElement.innerText = value;
    super.writeValue(value);
  }

  updateValue() {
    const value = this.element.nativeElement.value;
    this.onChangeCallback(value);
  }
}

