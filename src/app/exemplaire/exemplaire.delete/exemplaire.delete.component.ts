import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ExemplaireService} from "../../../shared/services/ExemplaireService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {toSignal} from "@angular/core/rxjs-interop";
import {OeuvreService} from "../../../shared/services/OeuvreService";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, Location} from "@angular/common";
import {EOeuvreType} from "../../../shared/enums/EOeuvreType";
import {derivedAsync} from "ngxtension/derived-async";
import {DEFAULT_SNACK_DURATION_IN_MS} from "../../../shared/constants";

@Component({
    selector: 'app-exemplaire.delete',
    templateUrl: './exemplaire.delete.component.html',
    styleUrl: './exemplaire.delete.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCard,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatButton,
        MatSelect,
        MatOption,
        MatIcon,
        MatError,
        MatLabel,
        DatePipe
    ]
})
export class ExemplaireDeleteComponent {
    readonly #exemplaireService = inject(ExemplaireService);
    readonly #oeuvreService = inject(OeuvreService);
    readonly #location = inject(Location);
    readonly snackBar = inject(MatSnackBar);
    livreList = toSignal(this.#oeuvreService.getAsNommable("livre").pipe(), {initialValue: []});
    magazineList = toSignal(this.#oeuvreService.getAsNommable("magazine").pipe(), {initialValue: []});
    readonly eOeuvreType = Object.entries(EOeuvreType).map(([key, value]) => ({key, value}));
    idOeuvre = signal('');

    exemplaireForm = new FormGroup({
        oeuvreType: new FormControl('', [Validators.required]),
        idOeuvre: new FormControl({value: '', disabled: true}, [Validators.required]),
        idExemplaire: new FormControl({value: '', disabled: true}, [Validators.required])
    });
    exemplaireList = derivedAsync(() =>
        this.#exemplaireService.getByOeuvreId(this.idOeuvre()).pipe());

    constructor() {

        this.exemplaireForm.valueChanges.subscribe((form) => {
            const idOeuvreControl = this.exemplaireForm.get('idOeuvre');
            const idExemplaireControl = this.exemplaireForm.get('idExemplaire');
            if (!form.oeuvreType) {
                idOeuvreControl?.disable({emitEvent: false});
            } else {
                idOeuvreControl?.enable({emitEvent: false});
            }

            if (!form.idOeuvre) {
                idExemplaireControl?.disable({emitEvent: false});
            } else {
                idExemplaireControl?.enable({emitEvent: false});
                this.idOeuvre.set(form.idOeuvre);
            }
        });
    }

    cancelDelete() {
        this.#location.back();
    }

    onSubmit() {
        // todo loader
        // this.loadingExemplaire.set(true);
        if (this.exemplaireForm.valid && this.exemplaireForm.value.idExemplaire) {
            this.#exemplaireService.deleteExemplaire(this.exemplaireForm.value.idExemplaire).subscribe({
                next: () => {
                    this.snackBar.open('L\'exemplaire a été supprimé.',
                        'FERMER', {duration: DEFAULT_SNACK_DURATION_IN_MS});
                    this.exemplaireForm.markAsPristine();
                    this.#location.back();
                },
                error: () => {
                    this.snackBar.open('Erreur : L\'exemplaire n\'a pas été supprimé.',
                        'FERMER', {
                            duration: DEFAULT_SNACK_DURATION_IN_MS,
                            panelClass: ['error-snackbar']
                        });
                }
            });
        }
    }
}
