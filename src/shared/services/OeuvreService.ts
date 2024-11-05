import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {OeuvreNommable} from "../dto/OeuvreNommable";
import {environment} from "../../environments/environment";
import {Oeuvre} from "../dto/Oeuvre";
import {Exemplaire} from "../dto/Exemplaire";

@Injectable({
    providedIn: 'root'
})
export class OeuvreService {
    readonly #http = inject(HttpClient);

    postOeuvre(oeuvre: Oeuvre) {
        let url = '/api/oeuvre';
        return this.#http.post<Oeuvre>(environment.SERVER_API_URL + url, oeuvre, {observe: 'response'});
    }

    getAsNommable(oeuvreType: string) {
        let url = `/api/oeuvre/nommable/${oeuvreType}`;
        return this.#http.get<OeuvreNommable[]>(environment.SERVER_API_URL + url);
    }
}