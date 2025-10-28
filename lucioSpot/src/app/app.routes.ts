import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { authGuard, isAdmin } from './auth-guard';
import { NovaReservaComponent } from './pages/home/modules/nova-reserva/nova-reserva';
import { ReservasListComponent } from './pages/home/modules/lista-reservas/lista-reservas';
import { Dashboard } from './pages/home/modules/dashboard/dashboard';
import { Acessos } from './pages/home/modules/acessos/acessos';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: HomeComponent, canActivate: [authGuard], children:[
        {path: 'reservar', component: NovaReservaComponent},
        {path: 'dashboard', component: Dashboard ,canActivate: [isAdmin]},
        {path: 'acessos', component: Acessos, canActivate: [isAdmin]},
        {path: 'reservas', component: ReservasListComponent}
    ] }
];

