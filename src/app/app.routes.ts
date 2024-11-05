import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./start/start.routes').then(m => m.routes)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.routes').then(m => m.routes)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.routes)
    },
    {
        path: 'usager',
        loadChildren: () => import('./usager/usager.routes').then(m => m.routes)
    },
    {
        path: 'reservation',
        loadChildren: () => import('./reservation/reservation.routes').then(m => m.routes)
    },
    {
        path: 'oeuvre',
        loadChildren: () => import('./oeuvre/oeuvre.routes').then(m => m.routes)
    },
    {
        path: 'exemplaire',
        loadChildren: () => import('./exemplaire/exemplaire.routes').then(m => m.routes)
    }
];
