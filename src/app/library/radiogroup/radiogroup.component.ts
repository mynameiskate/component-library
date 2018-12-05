import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ContentChildren,
  ElementRef,
  AfterContentInit,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { RadiogroupService } from './radiogroup.service';

@Component({
  selector: 'clb-radiogroup',
  templateUrl: './radiogroup.component.html',
  providers: [CreateAccessorProvider(RadiogroupComponent), RadiogroupService]
})
export class RadiogroupComponent extends ControlValueAccessorBase<string> implements AfterContentInit {
  @Input() label: string;
  @Input() formControlName: string;
  @Input() optionTemplate: TemplateRef<any>;

  @ContentChildren(RadiobuttonComponent) radioButtons: QueryList<RadiobuttonComponent>;

  @Output() selectionChange = new EventEmitter<string>();

  constructor(private el: ElementRef,
              private btnGroupService: RadiogroupService) {
    super();
  }

  ngAfterContentInit() {
    this.btnGroupService.init(this.formControlName, this.optionTemplate);
  }

  onChange(target) {
    this.updateButtonGroup(target.id);
    this.writeValue(target.value);
    this.onChangeCallback(target.value);
    this.selectionChange.emit(target.value);
  }

  updateButtonGroup(checkedId) {
    this.radioButtons.forEach(item => {
      const input = item.el.nativeElement
        .getElementsByTagName('input')[0];
      item.checked = checkedId === input.id;
    });
  }
}
