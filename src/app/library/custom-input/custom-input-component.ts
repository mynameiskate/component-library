import { Component, ElementRef, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';

import { AbstractValueAccessor, CreateAccessorProvider } from '../control-value-accessor/AbstractControlValueAccessor';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.html',
  providers: [CreateAccessorProvider(CustomInputComponent)]
})
export class CustomInputComponent extends AbstractValueAccessor<string> implements OnChanges {
  @Input() inputLabel: string;
  @Input() errorMessages: Array[string] = ["error description 1", "error description 2"];

  @ViewChild('element') element: ElementRef;

  private isValid: boolean = false;

  ngOnChanges(changes: SimpleChanges) {

  }

  writeValue(value: string) {
    this.element.nativeElement.innerText = value;
    this.value = value;
  }
}

