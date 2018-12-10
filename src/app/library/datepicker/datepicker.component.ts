import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'clb-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [CreateAccessorProvider(DatepickerComponent)]
})
export class DatepickerComponent extends ControlValueAccessorBase<NgbDateStruct> {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select date...';

  @ViewChild('datepickerInstance') datepickerInstance: NgbInputDatepicker;

  @Output() dateChange = new EventEmitter<NgbDateStruct>();

  selectedDate: NgbDateStruct;

  onDateChange(date: NgbDateStruct) {
    this.onChangeCallback(date);
    this.writeValue(date);
    this.dateChange.emit(date);
  }
}
