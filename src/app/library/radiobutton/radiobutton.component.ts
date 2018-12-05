import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { RadiogroupService } from '../radiogroup/radiogroup.service';

@Component({
  selector: 'clb-radio-btn',
  templateUrl: './radiobutton.component.html',
  providers: [CreateAccessorProvider(RadiobuttonComponent)]
})
export class RadiobuttonComponent extends ControlValueAccessorBase<string> {
  @Input() label: string;

  labelTemplate: TemplateRef<any>;
  checked: boolean;
  btnName: string;
  btnId: string;

  constructor(public el: ElementRef,
              private btnGroupService: RadiogroupService) {
    super();

    this.btnName = this.btnGroupService.getBtnName();
    this.btnId = this.btnGroupService.getBtnId();
    this.labelTemplate = btnGroupService.getBtnTemplate();
  }
}
