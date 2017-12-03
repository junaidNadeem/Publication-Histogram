import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PublicationsChartComponent} from "./publications-chart/publications-chart.component";

const appRoutes: Routes = [
  {path: 'publications-chart', component: PublicationsChartComponent},
  {path: '', redirectTo: 'publications-chart', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
