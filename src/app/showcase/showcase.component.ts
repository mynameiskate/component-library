import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as ValidationService from '../shared/input-validation/InputValidationService';
import { EndpointService } from '../shared/endpoints-service/EndpointService';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['../../assets/styles/form.less'],
  providers: [EndpointService]
})
export class ShowcaseComponent {
  formData: any;
  inputForm = this.fb.group({
    username: ['', Validators.minLength(1)],
    email: ['', [Validators.required, Validators.email]],
    gender: null,
    countries: [],
    birthCountry: null,
    unicornCheck: null,
    favColour: null,
    birthday: null,
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

  constructor(private fb: FormBuilder,
              private service: EndpointService) {}

  onSubmit() {
    this.formData = this.inputForm.value;
    this.resetForm();
  }

  resetForm(): void {
    this.inputForm.reset();

    for (const key in this.inputForm.controls) {
      this.inputForm.controls[key].setErrors(null);
    }
  }

  autocompleteOptions = (searchInput: string) => (
    this.service.getCountryAutocompleteOptions(searchInput)
  )

  getCountryPromise = () => (
    this.service.getCountryPromise()
  )

  getGenderOptions = () => (
    this.service.getGenderOptions()
  )

  getCountryOptions = () => (
    this.service.getCountryOptions()
  )

  getColourOptions = () => (
    this.service.getColourOptions()
  )

  getColorOptions = () => (
    this.service.getColorOptions()
  )

  get startDate() {
    return new Date(1990, 0,  1);
  }

  get endDate() {
    return new Date();
  }
}
