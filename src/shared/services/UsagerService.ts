import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Usager} from "../dto/Usager";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UsagerService {
    readonly #http = inject(HttpClient);

    postUsager(usager: Usager) {
        let url = '/api/usager';
        return this.#http.post<Usager>(environment.SERVER_API_URL + url, usager, {observe: 'response'});
    }
}
