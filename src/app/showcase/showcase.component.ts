import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['../../assets/styles/showcase.component.less']
})
export class ShowcaseComponent implements OnInit {
  inputText: string = "some value";
  inputLabel: string = "Some example title";

  constructor() { }

  ngOnInit() {
  }

}
