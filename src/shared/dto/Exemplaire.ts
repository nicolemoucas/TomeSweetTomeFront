export interface Exemplaire {
    id?: string;
    // todo est-ce que c'est type exemplaire ou un héritage et quand le faire
    idOeuvre: string;
    edition: string;
    etat: string; // todo changer a enum
    descriptionEtat: string;
}