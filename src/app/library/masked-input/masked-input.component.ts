import { Component, ElementRef, ViewChild, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as _ from 'lodash';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';

export const USMaskedInputTypes = {
  USPhone: ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  USZip: [/\d/, /\d/, /\d/, /\d/, /\d/],
};

@Component({
  selector: 'clb-masked-input',
  templateUrl: './masked-input.component.html',
  providers: [CreateAccessorProvider(MaskedInputComponent)]
})
export class MaskedInputComponent extends ControlValueAccessorBase<string> implements OnInit {
  @Input() inputLabel: string;
  @Input() inputType: string;
  @Input() mask: Array<string | RegExp> = USMaskedInputTypes.USPhone;

  @Output() inputChange = new EventEmitter<string>();

  @ViewChild('element') element: ElementRef;

  control: NgControl;

  constructor(private inj: Injector) {
    super();
  }

  ngOnInit() {
    this.control = this.inj.get(NgControl);
  }

  writeValue(value: string) {
    this.element.nativeElement.innerText = value;
    super.writeValue(value);
    this.inputChange.emit(value);
  }

  updateValue() {
    const value = this.element.nativeElement.value;
    this.onChangeCallback(value);
  }

  private getMaskStr(start: number, mask: Array<string | RegExp>): string {
    let maskStr = '';

    while ((!_.isRegExp(mask[start])) && (start < mask.length)) {
      maskStr += mask[start++];
    }

    return maskStr;
  }

  insertText(event) {
    event.preventDefault();

    const { key } = event;
    const { value } = event.target;
    let index = value.length;

    if ((key === 'Backspace') || (key === 'Delete')) {
      const delStart = _.findLastIndex(this.mask,
        (exp, i) => (_.isRegExp(exp)) && (i < value.length));
      event.target.value = value.slice(0, Math.max(delStart, 0));
    } else if (value.length >= this.mask.length) {
      return false;
    } else {
      event.target.value += this.getMaskStr(index, this.mask);
      index = event.target.value.length;

      const regexp = <RegExp>this.mask[index++];

      if (regexp.test(key)) {
        event.target.value += key;
        event.target.value += this.getMaskStr(index, this.mask);
      } else {
        return false;
      }
    }
  }
}

