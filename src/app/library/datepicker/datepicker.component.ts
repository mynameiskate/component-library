import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { NgbDateStruct, NgbInputDatepicker, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'clb-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [CreateAccessorProvider(DatepickerComponent),
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class DatepickerComponent extends ControlValueAccessorBase<NgbDateStruct> implements OnInit, AfterContentInit {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select date...';
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() formControl: FormControl = new FormControl();

  @ViewChild('datepickerInstance') datepickerInstance: NgbInputDatepicker;

  @Output() dateChange = new EventEmitter<Date>();

  selectedDate: NgbDateStruct;
  minDateStruct: NgbDateStruct;
  maxDateStruct: NgbDateStruct;

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)
      && this.datepickerInstance.isOpen()) {
      this.datepickerInstance.close();
    }
  }

  constructor(private el: ElementRef,
              private adapter: NgbDateAdapter<Date>) {
    super();
  }

  ngOnInit() {
    this.minDateStruct = this.adapter.fromModel(this.minDate);
    this.maxDateStruct = this.adapter.fromModel(this.maxDate);
  }

  ngAfterContentInit() {
    this.selectedDate = this.innerValue;
  }

  onDateChange(date: NgbDateStruct) {
    this.onChangeCallback(date);
    this.writeValue(date);
    this.dateChange.emit(this.adapter.toModel(date));
  }
}
