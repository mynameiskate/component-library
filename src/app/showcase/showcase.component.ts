import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['../../assets/styles/form.less'],
})
export class ShowcaseComponent implements OnInit {
  inputText: string = "some value";
  inputLabel: string = "Some example title";

  inputForm = this.fb.group({
    customInput: ['hey']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }
}
