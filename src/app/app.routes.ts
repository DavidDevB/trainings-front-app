import { Routes } from '@angular/router';
import { TrainingComponent } from './components/trainings.component/trainings.component';
import { CartComponent } from './components/cart.component/cart.component';
import { FormComponent } from './components/form.component/form.component';
import { ConnectionComponent } from './components/connection.component/connection.component';

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
        path: 'form',
        component: FormComponent
    },
    {
        path: '#',
        component: ConnectionComponent
    },
    {
        path:'**',
        redirectTo: 'trainings'
    }

];
