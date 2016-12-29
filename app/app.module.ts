import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IncidentLabelComponent } from './incidentLabel.component';
import { SelectModule } from "ng2-select";
import { HttpModule } from '@angular/http';
import { routing } from "./app.routes";
import { SelectTestComponent } from "./app.selectTest";
import {DataTableModule,SharedModule, DialogModule, DropdownModule} from 'primeng/primeng';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

@NgModule({
  imports: [BrowserModule, FormsModule, SelectModule, HttpModule,
   DataTableModule, SharedModule,
    DialogModule, DropdownModule, routing],
  declarations: [AppComponent, IncidentLabelComponent, SelectTestComponent],
  bootstrap: [AppComponent],
   providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})
export class AppModule { }
