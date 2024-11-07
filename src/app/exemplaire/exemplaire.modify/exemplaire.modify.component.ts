import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {ExemplaireService} from "../../../shared/services/ExemplaireService";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {Location} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {EEtatExemplaire} from "../../../shared/enums/EEtatExemplaire";
import {EOeuvreType} from "../../../shared/enums/EOeuvreType";
import {Exemplaire} from "../../../shared/dto/Exemplaire";
import {DEFAULT_SNACK_DURATION_IN_MS} from "../../../shared/constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OeuvreService} from "../../../shared/services/OeuvreService";
import {toSignal} from "@angular/core/rxjs-interop";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
    selector: 'app-exemplaire.modify',
    templateUrl: './exemplaire.modify.component.html',
    styleUrl: './exemplaire.modify.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCard,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        MatButton,
        RouterLink,
        MatIcon,
        MatInputModule,
        MatError,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatHint
    ],
    providers: [
        provideNativeDateAdapter()
    ]
})
export class ExemplaireModifyComponent {
    readonly #exemplaireService = inject(ExemplaireService);
    readonly #oeuvreService = inject(OeuvreService);
    readonly #location = inject(Location);
    readonly snackBar = inject(MatSnackBar);
    loadingExemplaire = signal(false);
    readonly eEtatExemplaire = Object.entries(EEtatExemplaire).map(([key, value]) => ({key, value}));
    readonly eOeuvreType = Object.entries(EOeuvreType).map(([key, value]) => ({key, value}));
    livreList = toSignal(this.#oeuvreService.getAsNommable("livre").pipe(), {initialValue: []});
    magazineList = toSignal(this.#oeuvreService.getAsNommable("magazine").pipe(), {initialValue: []});

    exemplaireForm = new FormGroup({
        oeuvreType: new FormControl('', [Validators.required]),
        idOeuvre: new FormControl({value: '', disabled: true}, [Validators.required]),
        edition: new FormControl('', [Validators.required]),
        etat: new FormControl('', [Validators.required]),
        descriptionEtat: new FormControl('', [Validators.required]),
        publicationDate: new FormControl(new Date().toISOString(), [Validators.required]),
    });

    constructor() {
        this.exemplaireForm.valueChanges.subscribe((form) => {
            const idOeuvreControl = this.exemplaireForm.get('idOeuvre');
            if (!form.oeuvreType) {
                idOeuvreControl?.disable({emitEvent: false});
            } else {
                idOeuvreControl?.enable({emitEvent: false});
            }
        });
    }

    cancelModifications() {
        this.#location.back();
    }

    onSubmit() {
        this.loadingExemplaire.set(true);
        // todo loader
        if (this.exemplaireForm.valid) {
            const formValue: Exemplaire = this.exemplaireForm.value as Exemplaire;
            // ...this.exemplaire(),
            const exemplaire: Exemplaire = {
                idOeuvre: formValue.idOeuvre,
                edition: formValue.edition,
                etat: formValue.etat,
                descriptionEtat: formValue.descriptionEtat,
                publicationDate: formValue.publicationDate,
            }

            this.#exemplaireService.postExemplaire(exemplaire).subscribe({
                next: () => {
                    // this.snackBar.open(exemplaire.IdServer ? 'L\'exemplaire a bien été modifiée.' : 'L\'exemplaire a bien été créé.',
                    //     'FERMER', {duration: DEFAULT_SNACK_DURATION_IN_MS});
                    this.snackBar.open('L\'exemplaire a été créé.',
                        'FERMER', {duration: DEFAULT_SNACK_DURATION_IN_MS});
                    this.exemplaireForm.markAsPristine();
                    this.#location.back();
                },
                error: () => {
                    this.snackBar.open('Erreur : L\'exemplaire n\'a pas été créé.',
                        'FERMER', {
                            duration: DEFAULT_SNACK_DURATION_IN_MS,
                            panelClass: ['error-snackbar']
                        });
                }
            });
        }
    }
}