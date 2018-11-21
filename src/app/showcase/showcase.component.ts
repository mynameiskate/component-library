import { Component, OnInit } from '@angular/core';
import { InputValidationService} from "./input-validation/InputValidationService";
import { IInputValidationService } from "../library/shared/validation-service/IInputValidationService";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['../../assets/styles/form.less']
})
export class ShowcaseComponent implements OnInit {
  inputText: string = "some value";
  inputLabel: string = "Some example title";
  validationService: IInputValidationService = new InputValidationService();

  constructor() { }

  ngOnInit() {
  }

}
