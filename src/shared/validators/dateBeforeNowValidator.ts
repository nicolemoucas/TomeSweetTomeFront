import {FormControl, ValidationErrors} from "@angular/forms";

export function dateBeforeNowValidator(control: FormControl): ValidationErrors | null {
    const date: Date = new Date(control.value);
    const now: Date = new Date();
    return date < now ? null : {'dateBeforeNow': true};
}
