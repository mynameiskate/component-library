import { forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  protected value: T;
  @Input() disabled: boolean = false;

  writeValue(value: T) {
    this.value = value;
    this.onChangeCallback(value);
  }

  onChangeCallback = (_: any) => {}
  onTouchCallback = () => {}

  registerOnChange(fn: (_: any) => void) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

export function CreateAccessorProvider(component: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true
  };
}
