import { Routes } from '@angular/router';
import { TrainingComponent } from './components/trainings/trainings';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/trainings',
        pathMatch: 'full' 
    },
   
    { path: 'trainings', 
    component: TrainingComponent 
}
];
