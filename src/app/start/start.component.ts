import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrl: './start.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButton,
        RouterLink,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle
    ],
})
export class StartComponent {

}
