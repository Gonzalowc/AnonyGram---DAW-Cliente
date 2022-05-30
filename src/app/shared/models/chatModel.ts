export interface ChatCompleto {
    id_chat: number,
    fecha_creacion: Date,
    fecha_ultimo_mensaje?: Date,
    nombre_chat_creador?:string,
    nombre_chat_respuesta?:string,
    id_usuario_creador:number,
    id_usuario_respuesta:number,
    imagen?:string,
    ultimo_mensaje?:string
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
}