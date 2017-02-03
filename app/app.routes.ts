import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentLabelComponent } from "./incidentLabel.component";
import { SelectTestComponent } from "./app.selectTest";
import { BlueComponent } from "./app.blue";

const routes: Routes = [
    { path: '', redirectTo: '/green', pathMatch: 'full' },
    { path: 'red', component: SelectTestComponent },
    { path: 'green', component: IncidentLabelComponent },
    { path: 'blue', component: BlueComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);