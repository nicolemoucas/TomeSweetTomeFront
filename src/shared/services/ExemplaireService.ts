import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Exemplaire} from "../dto/Exemplaire";
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ExemplaireService {
    readonly #http = inject(HttpClient);

    postExemplaire(exemplaire: Exemplaire) {
        let url = '/api/exemplaire';
        return this.#http.post<Exemplaire>(environment.SERVER_API_URL + url, exemplaire, {observe: 'response'});
    }

    deleteExemplaire(idExemplaire: string) {
        let url = `/api/exemplaire/${idExemplaire}`;
        return this.#http.delete(environment.SERVER_API_URL + url, {observe: 'response'});
    }

    getByOeuvreId(oeuvreId: string | null) {
        if (oeuvreId) {
            let url = `/api/exemplaire/get_by_oeuvre/${oeuvreId}`;
            return this.#http.get<Exemplaire[]>(environment.SERVER_API_URL + url);
        }
        return of(null);
    }
}