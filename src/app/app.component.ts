import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {
    Event,
    NavigationSkipped,
    NavigationStart,
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {toSignal} from "@angular/core/rxjs-interop";
import {filter, map} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, MatButton, RouterLink, MatToolbar, RouterLinkActive],
})
export class AppComponent {
    title = 'TomeSweetTomeFront';
    readonly #router = inject(Router);
    isPageConnexion = toSignal(this.#router.events.pipe(
        filter((event: Event): event is NavigationStart | NavigationSkipped => event instanceof NavigationStart || event instanceof NavigationSkipped),
        map((event: NavigationStart | NavigationSkipped) => event.url),
        map((url: string) => url === '/'),
    ));
}
