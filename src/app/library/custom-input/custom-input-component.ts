import { Component, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

import { AbstractValueAccessor, CreateAccessorProvider } from '../control-value-accessor/AbstractControlValueAccessor';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.html',
  providers: [CreateAccessorProvider(CustomInputComponent)]
})
export class CustomInputComponent extends AbstractValueAccessor<string> implements OnChanges {
  @ViewChild('element') element: ElementRef;

  inputText: string;

  ngOnChanges(changes: SimpleChanges) {

  }

  writeValue(value: string) {
    //this.element.nativeElement.innerText = value;
    this.inputText = value;
  }
}

