import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  Injector,
  Output,
  EventEmitter,
  HostListener,
  AfterContentInit, Renderer2
} from '@angular/core';
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
export class MaskedInputComponent extends ControlValueAccessorBase<string> implements OnInit, AfterContentInit {
  @Input() inputLabel: string;
  @Input() inputType: string;
  @Input() mask: Array<string | RegExp> = USMaskedInputTypes.USPhone;
  @Input() placeholder: string = '_';

  @Output() inputChange = new EventEmitter<string>();

  @ViewChild('element') element: ElementRef;

  control: NgControl;
  cursorPosition: number = 0;

  @HostListener('paste', ['$event'])
  onPaste(event) {
    event.preventDefault();

    const { clipboardData } = event;
    const newText = this.innerValue
      .slice(0, event.target.selectionStart)
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

  constructor(private inj: Injector,
              private el: ElementRef) {
    super();
  }

  ngOnInit() {
    this.control = this.inj.get(NgControl);
  }

  ngAfterContentInit() {
    this.writeValue(this.maskedText);
  }

  writeValue(value: string) {
    super.writeValue(value);
    this.inputChange.emit(value);
  }

  setCursor() {
    const input = this.el.nativeElement
      .getElementsByTagName('input')[0];
    input.focus();
    input.setSelectionRange(this.cursorPosition,
      this.cursorPosition, 'none');
  }

  getMaskedText(start: number, end: number) {
    let text = '';

    this.mask.slice(start, end)
      .map(item => (
        text += _.isRegExp(item)
          ? this.placeholder
          : item
      ));

    return text;
  }

  get maskedText() {
    let text = '';

    this.mask.map(item => (
      text += _.isRegExp(item)
        ? this.placeholder
        : item
    ));

    return text;
  }

  insertText(event) {
    event.preventDefault();

    const { key, target } = event;
    const { selectionEnd } = target;
    let { value } = target;
    let { selectionStart } = target;

    if ((key === 'Backspace') || (key === 'Delete')) {
      if (selectionEnd == selectionStart) {
        selectionStart--;
      }

      const maskedText = this.getMaskedText(selectionStart , selectionEnd);
      value = value.slice(0, selectionStart)
        .concat(maskedText)
        .concat(value.slice(selectionEnd));
    } else if (_.isRegExp(this.mask[selectionStart])) {
      const regexp = <RegExp>this.mask[selectionStart];

      if ((key.length == 1) && (regexp.test(key))) {
        value = value.slice(0, selectionStart)
          .concat(key)
          .concat(value.slice(selectionStart + 1));
      } else {
        return false;
      }
    }

    this.cursorPosition = selectionEnd + 1;
    this.writeValue(value);

    return false;
  }
}
