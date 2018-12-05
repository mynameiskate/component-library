import { Component, Input, Output, EventEmitter, QueryList, ContentChildren, ElementRef, AfterContentInit, OnChanges } from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';

@Component({
  selector: 'clb-radiogroup',
  templateUrl: './radiogroup.component.html',
  providers: [CreateAccessorProvider(RadiogroupComponent)]
})
export class RadiogroupComponent extends ControlValueAccessorBase<string> implements AfterContentInit {
  @Input() label: string;
  @Input() formControlName;

  @ContentChildren(RadiobuttonComponent) radioButtons: QueryList<RadiobuttonComponent>;

  @Output() selectionChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {
    super();
  }

  ngAfterContentInit() {
    this.initButtonGroup();
  }

  onChange(value) {
    this.writeValue(value);
    this.onChangeCallback(value);
    this.selectionChange.emit(value);
  }

  initButtonGroup() {
    const container = this.el.nativeElement.getElementsByClassName('radioButtonContainer')[0];
    this.radioButtons.forEach((item, index) => {
      const radioBtn = item.el.nativeElement;
      const input = radioBtn.getElementsByTagName('input')[0];

      input.name = this.formControlName;
      input.id = `${this.formControlName}${index}`;

      container.appendChild(radioBtn);
    });
  }
}
