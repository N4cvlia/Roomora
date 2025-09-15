import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'Rooms', loadComponent: () => import('./Pages/rooms/rooms.component').then(m => m.RoomsComponent)},
    {path: 'Hotels', loadComponent: () => import('./Pages/hotels/hotels.component').then(m => m.HotelsComponent)},
    {path: 'Details', loadComponent: () => import('./Pages/details/details.component').then(m => m.DetailsComponent)},
    {path: '**', redirectTo: 'Home'}
];
