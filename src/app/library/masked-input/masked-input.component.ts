import { Component, ElementRef, ViewChild, OnInit, Input, Injector, Output, EventEmitter, HostListener } from '@angular/core';
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

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    e.preventDefault();

    const { clipboardData } = e;
    const newText = this.innerValue.slice(0, e.target.selectionStart)
      .concat(clipboardData.getData('Text'))
      .substring(0, this.mask.length);

      for (let i = 0; i < newText.length; i++) {
        if (_.isRegExp(this.mask[i])) {
          const regexp = <RegExp>this.mask[i];

          if (!regexp.test(newText[i])) {
            return false;
          }
        } else if (newText[i] !== this.mask[i]) {
          return false;
        }
      }

    this.writeValue(newText);
  }

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

    const { key, target } = event;
    let { value } = event.target;
    let index = value.length;

    if ((key === 'Backspace') || (key === 'Delete')) {
      const selectionLength = target.selectionEnd - target.selectionStart;
      const delStart = _.findLastIndex(this.mask,
        (exp, i) =>
          (_.isRegExp(exp)) && (i < target.selectionStart + (selectionLength ? 1 : 0))
      );

      value = value.slice(0, Math.max(delStart, 0));
    } else if (value.length >= this.mask.length) {
      return false;
    } else {
      value += this.getMaskStr(index, this.mask);
      index = value.length;

      const regexp = <RegExp>this.mask[index++];

      if ((key.length == 1) && (regexp.test(key))) {
        value += key;
        value += this.getMaskStr(index, this.mask);
      } else {
        return false;
      }
    }

    this.writeValue(value);
  }
}

