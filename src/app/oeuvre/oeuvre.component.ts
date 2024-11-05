import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-oeuvre',
    templateUrl: './oeuvre.component.html',
    styleUrl: './oeuvre.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCard,
        MatCardContent,
        MatCardTitle,
        RouterLink
    ]
})
export class OeuvreComponent {

}
