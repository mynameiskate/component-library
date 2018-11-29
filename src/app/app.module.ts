import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CustomInputComponent } from "./library/custom-input/custom-input.component";
import { ControlErrorsComponent } from "./shared/control-errors/control-errors.component";
import { DropdownComponent } from "./library/dropdown/dropdown.component";
import { MultiselectComponent } from "./library/multiselect/multiselect.component";


@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    CustomInputComponent,
    ControlErrorsComponent,
    DropdownComponent,
    MultiselectComponent
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
