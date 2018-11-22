import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputValidationService } from "./input-validation/InputValidationService";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['../../assets/styles/form.less'],
})
export class ShowcaseComponent implements OnInit {
  inputText: string = "some value";
  defaultInputLabel: string = "Default validation example:";
  customInputLabel: string = "Custom validation example:";

  inputForm = this.fb.group({
    defaultValidation: [
      'hey',
      [
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.required
      ]
    ],
    customValidation: ['bye', [InputValidationService.randomValidator] ]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

  }
}
