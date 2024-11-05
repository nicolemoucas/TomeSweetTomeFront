import {Routes} from "@angular/router";
import {UsagerComponent} from "./usager.component";
import {UsagerModificationComponent} from "./usager.modification/usager.modification.component";

export const routes: Routes = [
    {
        path: '',
        component: UsagerComponent,
        title: 'Usager'
    },
    {
        path: 'modification',
        component: UsagerModificationComponent,
        title: 'Usager modification' // fixme update to creation or modif
    }
]