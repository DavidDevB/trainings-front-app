import { Routes } from '@angular/router';
import { TrainingComponent } from './components/trainings/trainings.component';
import { App } from './app';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'trainings',
        pathMatch: 'full'
    },
   
    { path: 'trainings', 
    component: TrainingComponent 
}
];
