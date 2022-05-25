export interface ChatCompleto {
    id_chat: number,
    fecha_creacion: Date,
    nombre_chat_creador?:string,
    nombre_chat_respuesta?:string,
    id_usuario_creador:number,
    id_usuario_respuesta:number,
    imagen?:string,
}

export interface ChatModel {
    id_chat: number,
    nombre_chat?:string,
    id_usuario_creador:number,
    id_usuario_respuesta:number,
    ultimo_mensaje?:string,
    timestamp:string
    imagen?:string,
}