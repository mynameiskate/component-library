import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { NgbDateStruct, NgbInputDatepicker, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'clb-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [CreateAccessorProvider(DatepickerComponent),
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class DatepickerComponent extends ControlValueAccessorBase<NgbDateStruct> {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select date...';
  @Input() minDate: Date;
  @Input() maxDate: Date;

  @ViewChild('datepickerInstance') datepickerInstance: NgbInputDatepicker;

  @Output() dateChange = new EventEmitter<Date>();

  selectedDate: NgbDateStruct;

  constructor(private el: ElementRef,
              private adapter: NgbDateAdapter<Date>) {
    super();
  }

  @HostListener('document:click', ['$event'])
    handleClick(event: Event) {
      if (!this.el.nativeElement.contains(event.target)
        && this.datepickerInstance.isOpen()) {
        this.datepickerInstance.close();
      }
  }

  get minDateStruct() {
    return this.adapter.fromModel(this.minDate);
  }

  get maxDateStruct() {
    return this.adapter.fromModel(this.maxDate);
  }

  onDateChange(date: NgbDateStruct) {
    this.onChangeCallback(date);
    this.writeValue(date);
    this.dateChange.emit(this.adapter.toModel(date));
  }
}
