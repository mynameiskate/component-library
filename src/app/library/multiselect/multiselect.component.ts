import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ControlValueAccessorBase, CreateAccessorProvider } from '../../shared/control-value-accessor/ControlValueAccessorBase';
import { IDropdownItem } from "../dropdown/dropdown.models";

@Component({
  selector: 'clb-multiselect',
  templateUrl: './multiselect.component.html',
  providers: [CreateAccessorProvider(MultiselectComponent)]
})
export class MultiselectComponent extends ControlValueAccessorBase<String> {
  @Input() label: string;
  @Input() items: IDropdownItem[] = [];
  @Input() itemTemplate: TemplateRef<any>;

  @Output() selectionChange = new EventEmitter<Array<string>>();

  selectedItemsIds: Array<string> = [];

  onItemSelect = (itemId) => {
    if (!this.isItemSelected(itemId)) {
      this.selectedItemsIds.push(itemId);
    } else {
      this.selectedItemsIds = this.selectedItemsIds.filter(id => id != itemId);
    }

    this.onChangeCallback(this.selectedItemsIds);
    this.selectionChange.emit(this.selectedItemsIds);
  }

  writeValue(id: string) {
    if (id) {
      this.selectedItemsIds = [id];
      super.writeValue(this.selectedItems);
    }
  }

  isItemSelected(itemId: string): boolean {
    return this.selectedItemsIds.some(id => id == itemId);
  }

  get selectedItems() {
    return this.items
      .filter(item => this.selectedItemsIds
        .some(id => id === item.id))
      .map(item => item.value)
      .join(', ');
  }
}
