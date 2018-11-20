import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.less']
})
export class ShowcaseComponent implements OnInit {
  inputText:string = "initial value";

  constructor() { }

  ngOnInit() {
  }

}
