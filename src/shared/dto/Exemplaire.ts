export interface Exemplaire {
    id?: string;
    idOeuvre: string;
    edition: string;
    etat: string; // todo changer a enum
    descriptionEtat: string;
    publicationDate: string;
}