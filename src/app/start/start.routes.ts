import {Routes} from "@angular/router";
import {StartComponent} from "./start.component";
import {LoginComponent} from "../login/login.component";

export const routes: Routes = [
    {
        path: '',
        component: StartComponent,
        title: 'Bienvenue'
    }
]