import { Component, Input, Output, EventEmitter, TemplateRef, HostListener, HostBinding } from '@angular/core';
import { IDropdownItem } from './dropdown.models';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';

@Component({
  selector: 'clb-dropdown',
  templateUrl: './dropdown.component.html',
  providers: [CreateAccessorProvider(DropdownComponent)]
})
export class DropdownComponent extends ControlValueAccessorBase<String> {
  @Input() togglerTitle: string;
  @Input() items: IDropdownItem[] = [];
  @Input() itemTemplate: TemplateRef<any>;

  @Output() selectionChange = new EventEmitter<string>();

  selectedItemId: string;

  onItemSelect = (id: string) => {
    this.selectedItemId = id;
    this.onChangeCallback(id);
    this.onTouchCallback();
    this.selectionChange.emit(id);
  }

  writeValue(id: string) {
    this.selectedItemId = id;
    super.writeValue(id);
  }

  get selectedItem() {
    return this.items.find(i => i.id === this.selectedItemId);
  }
}
