import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Exemplaire} from "../dto/Exemplaire";

@Injectable({
    providedIn: 'root'
})
export class ExemplaireService {
    readonly #http = inject(HttpClient);

    postExemplaire(exemplaire: Exemplaire) {
        let url = '/api/exemplaire';
        return this.#http.post<Exemplaire>(environment.SERVER_API_URL + url, exemplaire, {observe: 'response'});
    }
}