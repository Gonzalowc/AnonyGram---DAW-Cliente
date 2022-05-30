export interface MensajeCompleto {
    mensaje:string,
    id_usuario: number,
    active:boolean,
    timestamp:Date,
    id_chat: number,
}

export interface AllMensajesCompleto {
    idChat:number,
    listMensajes?:MensajeCompleto[],
}