import { ChangeDetectorRef, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';

@Component({
  selector: 'clb-radio-btn',
  templateUrl: './radiobutton.component.html',
  providers: [CreateAccessorProvider(RadiobuttonComponent)]
})
export class RadiobuttonComponent extends ControlValueAccessorBase<string> {
  @Input() label: string;
  @Input() labelTemplate: TemplateRef<any>;

  constructor(public el: ElementRef) {
    super();
  }
}
