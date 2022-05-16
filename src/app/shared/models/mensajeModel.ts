export interface MensajeCompleto {
    id_mensaje:number,
    active:boolean,
    mensaje:string,
    timestamp:Date,
    id_chat: number,
    id_usuario: number,
}