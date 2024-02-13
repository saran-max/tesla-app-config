import { Routes } from '@angular/router';
import { ModelColorComponent } from './model-color/model-color.component';
import { ConfigOptionsComponent } from './config-options/config-options.component';
import { CostDetailsComponent } from './cost-details/cost-details.component';

export const routes: Routes = [
    { path: 'model-color', component: ModelColorComponent },
    { path: 'config-options', component: ConfigOptionsComponent },
    { path: 'cost-details', component: CostDetailsComponent },
    { path: '', redirectTo: '/model-color', pathMatch: 'full' } 
  ];
