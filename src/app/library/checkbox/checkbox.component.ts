import { Component, Input, Output, EventEmitter, TemplateRef, OnInit } from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';

@Component({
  selector: 'clb-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [CreateAccessorProvider(CheckboxComponent)]
})
export class CheckboxComponent extends ControlValueAccessorBase<boolean> implements OnInit {
  @Input() label: string;
  @Input() defaultState: boolean = false;
  @Input() labelTemplate: TemplateRef<any>;

  @Output() selectionChange = new EventEmitter<boolean>();

  checked: boolean = false;

  ngOnInit() {
    this.checked = this.defaultState;
  }

  onStateChange(isChecked: boolean) {
    this.checked = isChecked;
    this.onChangeCallback(isChecked);
    this.selectionChange.emit(isChecked);
  }
}
