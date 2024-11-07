import {Routes} from "@angular/router";
import {ExemplaireComponent} from "./exemplaire.component";
import {ExemplaireModifyComponent} from "./exemplaire.modify/exemplaire.modify.component";
import {ExemplaireDeleteComponent} from "./exemplaire.delete/exemplaire.delete.component";

export const routes: Routes = [
    {
        path: '',
        component: ExemplaireComponent,
        title: 'Exemplaires'
    },
    {
        path: 'modify',
        component: ExemplaireModifyComponent,
        title: 'Exemplaires modification' // fixme update to creation or modif
    },
    {
        path: 'delete',
        component: ExemplaireDeleteComponent,
        title: 'Exemplaires supprimer'
    }
]