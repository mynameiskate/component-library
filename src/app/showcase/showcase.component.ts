import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as ValidationService from "../shared/input-validation/InputValidationService";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['../../assets/styles/form.less'],
})
export class ShowcaseComponent {
  inputForm = this.fb.group({
    username: ['', Validators.minLength(1)],
    email: ['', [Validators.required, Validators.email]],
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

  constructor(private fb: FormBuilder) {
  }
}
