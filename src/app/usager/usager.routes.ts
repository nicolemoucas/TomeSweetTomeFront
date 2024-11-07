import {Routes} from "@angular/router";
import {UsagerComponent} from "./usager.component";
import {UsagerModifyComponent} from "./usager.modify/usager.modify.component";

export const routes: Routes = [
    {
        path: '',
        component: UsagerComponent,
        title: 'Usager'
    },
    {
        path: 'modify',
        component: UsagerModifyComponent,
        title: 'Usager modification' // fixme update to creation or modif
    }
]