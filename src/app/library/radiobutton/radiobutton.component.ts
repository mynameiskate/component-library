import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { RadiogroupService } from '../radiogroup/radiogroup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'clb-radio-btn',
  templateUrl: './radiobutton.component.html',
  providers: [CreateAccessorProvider(RadiobuttonComponent)]
})
export class RadiobuttonComponent extends ControlValueAccessorBase<string> implements OnInit, OnDestroy {
  @Input() label: string;

  private subscription: Subscription;

  labelTemplate: TemplateRef<any>;
  checked: boolean;
  btnName: string;
  btnId: string;

  constructor(private btnGroupService: RadiogroupService) {
    super();

    this.subscription = this.btnGroupService
      .selectedId$
      .subscribe(id => (
        this.checked = id === this.btnId
      ));
  }

  ngOnInit() {
    this.btnName = this.btnGroupService.getBtnName();
    this.btnId = this.btnGroupService.getBtnId();
    this.labelTemplate = this.btnGroupService.getBtnTemplate();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onBtnSelect() {
    this.btnGroupService.announceSelectedBtnId(this.btnId);
  }
}
