import {Routes} from "@angular/router";
import {OeuvreComponent} from "./oeuvre.component";
import {OeuvreModificationComponent} from "./oeuvre.modification/oeuvre.modification.component";

export const routes: Routes = [
    {
        path: '',
        component: OeuvreComponent,
        title: 'Œuvres'
    },
    {
        path: 'modification',
        component: OeuvreModificationComponent,
        title: 'Œuvres modification' // fixme update to creation or modif
    },
]