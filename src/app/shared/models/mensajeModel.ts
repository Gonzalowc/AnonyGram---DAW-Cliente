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

export interface MensajeStadistics {
    mensajes_totales:number,
    mensajes_activos:number,
    mensajes_inactivos:number,
    mensajes_hoy:number,
}