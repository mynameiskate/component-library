import { Component, ElementRef, ViewChild, OnInit, Input, Injector } from '@angular/core';
import { NgControl } from '@angular/forms';

import { AbstractValueAccessor, CreateAccessorProvider } from '../shared/control-value-accessor/AbstractControlValueAccessor';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.html',
  providers: [CreateAccessorProvider(CustomInputComponent)]
})
export class CustomInputComponent extends AbstractValueAccessor<string> implements OnInit {
  @Input() inputLabel: string;
  @Input() maxLength: number;

  @ViewChild('element') element: ElementRef;

  control: NgControl;

  constructor(private inj: Injector) {
    super();
  }

  ngOnInit() {
    this.control = this.inj.get(NgControl);
  }

  writeValue(value: string) {
    this.element.nativeElement.innerText = value;
    super.writeValue(value);
  }

  updateValue(event) {
    const value = this.element.nativeElement.value;
    this.onChangeCallback(value);
  }
}

