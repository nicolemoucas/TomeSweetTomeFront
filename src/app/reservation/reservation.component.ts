import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrl: './reservation.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class ReservationComponent {

}
