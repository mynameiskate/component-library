import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CustomInputComponent } from "./library/custom-input/custom-input.component";
import { ControlErrorsComponent } from "./shared/control-errors/control-errors.component";
import { Dropdown } from "./shared/dropdown/dropdown";
import { DropdownItemDirective } from "./shared/directives/DropdownItemDirective";
import { DropdownSelectedValueDirective } from "./shared/directives/DropdownSelectedValueDirective";


@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    CustomInputComponent,
    ControlErrorsComponent,
    Dropdown,
    DropdownItemDirective,
    DropdownSelectedValueDirective,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
