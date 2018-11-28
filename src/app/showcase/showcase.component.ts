import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as ValidationService from "../shared/input-validation/InputValidationService";
import { IDropdownItem } from "../library/dropdown/dropdown.models";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['../../assets/styles/form.less'],
})
export class ShowcaseComponent {
  formData: any;
  inputForm = this.fb.group({
    username: ['', Validators.minLength(1)],
    email: ['', [Validators.required, Validators.email]],
    gender: null,
    password: ['',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]
    ],
    passwordConfirm: ['',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]
    ],
  }, {
    validator: ValidationService.matchPassword('password', 'passwordConfirm')
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.formData = this.inputForm.value;
    this.resetForm();
  }

  resetForm(): void {
    this.inputForm.reset();

    for(const key in this.inputForm.controls) {
      this.inputForm.controls[key].setErrors(null);
    }
  }

  getGenderOptions() {
    const genders: Array<IDropdownItem> = [
      {id: '0', value: 'male'},
      {id: '1', value: 'female'},
      {id: '2', value: 'other'}
    ];

    return genders;
  }
}
