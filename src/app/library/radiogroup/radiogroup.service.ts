import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RadiogroupService {
  private selectedId = new Subject<string>();
  selectedId$ = this.selectedId.asObservable();

  formGroupName: string = '';
  index: number = 0;
  optionTemplate: TemplateRef<any>;

  constructor() {}

  init(groupName: string, optionTemplate: TemplateRef<any>) {
    this.formGroupName = groupName;
    this.optionTemplate = optionTemplate;
  }

  getBtnName() {
    return this.formGroupName;
  }

  getBtnId() {
    return `${this.formGroupName}${this.index++}`;
  }

  getBtnTemplate() {
    return this.optionTemplate;
  }

  announceSelectedBtnId(btnId: string) {
    this.selectedId.next(btnId);
  }
}
