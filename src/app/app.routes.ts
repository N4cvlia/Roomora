import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { detailsResolver } from './Resolvers/details.resolver';

export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {
        path: 'Rooms',
        loadComponent: () => import('./Pages/rooms/rooms.component').then(m => m.RoomsComponent),
    },
    {path: 'Hotels', loadComponent: () => import('./Pages/hotels/hotels.component').then(m => m.HotelsComponent)},
    {
        path: 'Rooms/:id',
        loadComponent: () => import('./Pages/details/details.component').then(m => m.DetailsComponent),
        resolve: {
            Details: detailsResolver
        }
    },
    {path: '**', redirectTo: 'Home'}
];
