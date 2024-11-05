import {Routes} from "@angular/router";
import {ExemplaireComponent} from "./exemplaire.component";
import {ExemplaireModificationComponent} from "./exemplaire.modification/exemplaire.modification.component";

export const routes: Routes = [
    {
        path: '',
        component: ExemplaireComponent,
        title: 'Exemplaires'
    },
    {
        path: 'modification',
        component: ExemplaireModificationComponent,
        title: 'Exemplaires modification' // fixme update to creation or modif
    }
]