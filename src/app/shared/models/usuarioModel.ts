export interface UsuarioCompleto {
    id_usuario: number,
    activo: boolean,
    active_new_chat:boolean,
    name: string,
    rol: string,
    usuario: string,
    password?: string,
}

export interface UsuarioRegister {
    usuario: string,
    name: string,
    password: string
}

export interface UsuarioLogin {
    usuario:string,
    password:string
}