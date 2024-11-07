import {Routes} from "@angular/router";
import {OeuvreComponent} from "./oeuvre.component";
import {OeuvreModifyComponent} from "./oeuvre.modification/oeuvre.modify.component";

export const routes: Routes = [
    {
        path: '',
        component: OeuvreComponent,
        title: 'Œuvres'
    },
    {
        path: 'modify',
        component: OeuvreModifyComponent,
        title: 'Œuvres modification' // fixme update to creation or modif
    },
]