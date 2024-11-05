import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-usager',
    templateUrl: './usager.component.html',
    styleUrl: './usager.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatFormField,
        MatInput,
        MatLabel,
        MatCardTitle,
        RouterLink
    ],
})
export class UsagerComponent {

}
