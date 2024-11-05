import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {provideNativeDateAdapter} from "@angular/material/core";
import {dateBeforeNowValidator} from "../../../shared/validators/dateBeforeNowValidator";
import {Usager} from "../../../shared/dto/Usager";
import {UsagerService} from "../../../shared/services/UsagerService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DEFAULT_SNACK_DURATION_IN_MS} from "../../../shared/constants";
import {Location} from "@angular/common";

@Component({
    selector: 'app-usager.modification',
    templateUrl: './usager.modification.component.html',
    styleUrl: './usager.modification.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatFormField,
        MatInput,
        MatLabel,
        RouterLink,
        ReactiveFormsModule,
        MatError,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatIconModule,
        MatDatepicker
    ],
    providers: [
        provideNativeDateAdapter()
    ]
})
export class UsagerModificationComponent {
    readonly #usagerService = inject(UsagerService);
    readonly #location = inject(Location);
    readonly snackBar = inject(MatSnackBar);
    loadingUsager = signal(false);
    usagerForm = new FormGroup({
        lastName: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        birthday: new FormControl(new Date().toISOString(), [Validators.required,
            dateBeforeNowValidator]),
        mail: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        address: new FormGroup({
            street: new FormControl('', [Validators.required]),
            zipcode: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required])
        })
    });

    cancelModifications() {
        this.#location.back();
    }

    onSubmit() {
        this.loadingUsager.set(true);
        if (this.usagerForm.valid) {
            const formValue: Usager = this.usagerForm.value as Usager;
            // ...this.usager(),
            const usager: Usager = {
                lastName: formValue.lastName,
                firstName: formValue.firstName,
                birthday: formValue.birthday,
                mail: formValue.mail,
                phone: formValue.phone,
                address: {
                    street: formValue.address.street,
                    zipcode: formValue.address.zipcode,
                    city: formValue.address.city,
                    country: formValue.address.country,
                }
            }

            this.#usagerService.postUsager(usager).subscribe({
                next: () => {
                    // this.snackBar.open(notif.IdServer ? 'La notification a bien été modifiée.' : 'La notification a bien été créée.',
                    //     'FERMER', {duration: DEFAULT_SNACK_DURATION_IN_MS});
                    this.snackBar.open('Le compte utilisateur a été créé.',
                        'FERMER', {duration: DEFAULT_SNACK_DURATION_IN_MS});
                    this.usagerForm.markAsPristine();
                    this.#location.back();
                },
                error: () => {
                    this.snackBar.open('Erreur : Le compte utilisateur n\'a pas été créé.',
                        'FERMER', {
                            duration: DEFAULT_SNACK_DURATION_IN_MS,
                            panelClass: ['error-snackbar']
                        })
                }
            });
        }
    }
}
