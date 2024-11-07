import {ECategorie} from "../enums/ECategorie";
import {EPublicType} from "../enums/EPublicType";
import {EOeuvreType} from "../enums/EOeuvreType";

export interface Oeuvre {
    id?: string;
    title: string;
    author: string;
    category: ECategorie;
    oeuvreType: EOeuvreType;
    publicType: EPublicType;
}