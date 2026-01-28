import { Routes } from '@angular/router';
import { TrainingComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {
        path: 'trainings',
        component: TrainingComponent
    },
    {
        path:'cart',
        component: CartComponent
    },
    {
        path:'**',
        redirectTo: 'trainings'
    }

];
