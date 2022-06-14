export interface MensajeCompleto {
    id_mensaje?:number,
    mensaje:string,
    id_usuario: number,
    active:boolean,
    timestamp:Date,
    id_chat: number,
    reported:boolean,
    usuario?:string,
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
    mensajes_reportados:number,
}