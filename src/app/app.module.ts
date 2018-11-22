import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CustomInputComponent } from "./library/custom-input/custom-input.component";
import { ControlErrorsComponent } from "./shared/control-errors/control-errors.component";

@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    CustomInputComponent,
    ControlErrorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
