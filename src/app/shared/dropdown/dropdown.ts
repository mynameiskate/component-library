import { Component, Input, Output, EventEmitter, TemplateRef, OnInit } from '@angular/core';
import { IDropdownItem } from '../dropdown-models/models';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../control-value-accessor/ControlValueAccessorBase';

@Component({
  selector: 'clb-dropdown',
  templateUrl: './dropdown.html',
  providers: [CreateAccessorProvider(Dropdown)]
})
export class Dropdown extends ControlValueAccessorBase<IDropdownItem> {
  @Input() togglerTitle: string;
  @Input() items: IDropdownItem[] = [];
  @Input() disabled: boolean = false;
  @Input() itemTemplate: TemplateRef<any> = null;

  @Output() selectionChange = new EventEmitter<IDropdownItem>();

  selectedItem: IDropdownItem;

  onItemSelect = (item: IDropdownItem) => {
    this.writeValue(item);
    this.onChangeCallback(item);
    this.onTouchCallback();

    this.selectionChange.emit(item);
  }

  writeValue(item: IDropdownItem) {
    this.selectedItem = (item)
      ? this.items.find(i => i.id === item.id)
      : null;
  }
}
