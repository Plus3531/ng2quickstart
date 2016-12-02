import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IncidentLabelComponent } from './incidentLabel.component';
import { SelectModule } from "ng2-select";
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [BrowserModule, FormsModule, SelectModule, HttpModule],
  declarations: [AppComponent, IncidentLabelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
