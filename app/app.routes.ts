import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentLabelComponent } from "./incidentLabel.component";
import { SelectTestComponent } from "./app.selectTest";


const routes: Routes = [
    {path: '', redirectTo: '/green', pathMatch: 'full'},
    {path: 'red', component: SelectTestComponent},
    {path: 'green', component: IncidentLabelComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);