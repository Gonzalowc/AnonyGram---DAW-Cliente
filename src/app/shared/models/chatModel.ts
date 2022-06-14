export interface ChatCompleto {
    id_chat: number,
    fecha_creacion: Date,
    fecha_ultimo_mensaje?: Date,
    nombre_chat_creador?:string,
    nombre_chat_respuesta?:string,
    id_usuario_creador:number,
    id_usuario_respuesta:number,
    imagen?:string,
    ultimo_mensaje?:string,
    cantidad_mensajes?:number
    activo:boolean
}
export interface ChatModel {
    id_chat: number,
    nombre_chat?:string,
    fecha_ultimo_mensaje?: Date,
    id_usuario_creador:number,
    id_usuario_respuesta:number,
    ultimo_mensaje?:string,
    timestamp:string
    imagen?:string,
    activo:boolean;
}

export interface ChatStadistics{
    usuarios_buscando_chat?:number,
    chats_totales:number,
    chats_activos:number,
    chats_inactivos:number,
    chats_hoy:number,
    chats_sin_comenzar:number,
}