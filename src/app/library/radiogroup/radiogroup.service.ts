import { Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class RadiogroupService {
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
}
