import { Component, ElementRef, ViewChild, OnInit, Input, Injector } from '@angular/core';
import { NgControl } from '@angular/forms';

import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';

@Component({
  selector: 'clb-custom-input',
  templateUrl: './custom-input.component.html',
  providers: [CreateAccessorProvider(CustomInputComponent)]
})
export class CustomInputComponent extends ControlValueAccessorBase<string> implements OnInit {
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

