import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ContentChildren,
  ElementRef,
  TemplateRef, OnInit
} from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { RadiogroupService } from './radiogroup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'clb-radiogroup',
  templateUrl: './radiogroup.component.html',
  providers: [CreateAccessorProvider(RadiogroupComponent), RadiogroupService]
})
export class RadiogroupComponent extends ControlValueAccessorBase<string> implements OnInit {
  @Input() label: string;
  @Input() formControlName: string;
  @Input() optionTemplate: TemplateRef<any>;

  @ContentChildren(RadiobuttonComponent) radioButtons: QueryList<RadiobuttonComponent>;

  @Output() selectionChange = new EventEmitter<string>();

  private subscription: Subscription;

  constructor(private el: ElementRef,
              private btnGroupService: RadiogroupService) {
    super();

    this.subscription = this.btnGroupService
      .selectedId$
      .subscribe(id => this.onSelectionChange(id));
  }

  ngOnInit() {
    this.btnGroupService.init(this.formControlName, this.optionTemplate);
  }

  onSelectionChange(btnId: string) {
    const item = this.radioButtons
      .find(btn => btn.btnId === btnId);

    if (item) {
      this.writeValue(item.label);
      this.onChangeCallback(item.label);
      this.selectionChange.emit(item.label);
    }
  }
}
