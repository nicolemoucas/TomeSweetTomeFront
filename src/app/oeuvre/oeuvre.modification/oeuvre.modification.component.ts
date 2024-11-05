import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {OeuvreService} from "../../../shared/services/OeuvreService";
import {DEFAULT_SNACK_DURATION_IN_MS} from "../../../shared/constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Oeuvre} from "../../../shared/dto/Oeuvre";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatDatepicker} from "@angular/material/datepicker";
import {ECategorie} from "../../../shared/enums/ECategorie";
import {EPublicType} from "../../../shared/enums/EPublicType";
import {EOeuvreType} from "../../../shared/enums/EOeuvreType";

@Component({
    selector: 'app-oeuvre.modification',
    templateUrl: './oeuvre.modification.component.html',
    styleUrl: './oeuvre.modification.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        MatDatepicker
    ],
    providers: [
        provideNativeDateAdapter()
    ]
})
export class OeuvreModificationComponent {
    readonly #oeuvreService = inject(OeuvreService);
    readonly snackBar = inject(MatSnackBar);
    readonly #location = inject(Location);
    loadingOeuvre = signal(false);
    readonly eCategorie = Object.entries(ECategorie).map(([key, value]) => ({key, value}));
    readonly eOeuvreType = Object.entries(EOeuvreType).map(([key, value]) => ({key, value}));
    readonly ePublicType = Object.entries(EPublicType).map(([key, value]) => ({key, value}));

    oeuvreForm = new FormGroup({
        oeuvreType: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        author: new FormControl('', [Validators.required]),
        publicationDate: new FormControl(new Date().toISOString(), [Validators.required]),
        category: new FormControl('', [Validators.required]),
        publicType: new FormControl('', [Validators.required]),
    })

    cancelModifications() {
        this.#location.back();
    }

    onSubmit() {
        this.loadingOeuvre.set(true);
        // todo loader
        if (this.oeuvreForm.valid) {
            const formValue: Oeuvre = this.oeuvreForm.value as Oeuvre;
            // ...this.exemplaire(),
            const oeuvre: Oeuvre = {
                oeuvreType: formValue.oeuvreType,
                title: formValue.title,
                author: formValue.author,
                publicationDate: formValue.publicationDate,
                category: formValue.category,
                publicType: formValue.publicType
            }

            this.#oeuvreService.postOeuvre(oeuvre).subscribe({
                next: () => {
                    // this.snackBar.open(oeuvre.IdServer ? 'L\'oeuvre a bien été modifiée.' : 'L\'oeuvre a bien été créée.',
                    //     'FERMER', {duration: DEFAULT_SNACK_DURATION_IN_MS});
                    this.snackBar.open('L\'oeuvre a été créée.',
                        'FERMER', {duration: DEFAULT_SNACK_DURATION_IN_MS});
                    this.oeuvreForm.markAsPristine();
                    this.#location.back();
                },
                error: () => {
                    this.snackBar.open('Erreur : L\'oeuvre n\'a pas été créée.',
                        'FERMER', {
                            duration: DEFAULT_SNACK_DURATION_IN_MS,
                            panelClass: ['error-snackbar']
                        })
                }
            });
        }
    }
}
