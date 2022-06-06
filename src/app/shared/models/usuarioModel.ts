export interface UsuarioCompleto {
    id_usuario: number,
    activo: boolean,
    active_new_chat:boolean,
    name: string,
    rol: string,
    usuario: string,
    password?: string,
    registro:Date,
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

export interface UsuarioStadistics {
    usuarios_totales:number,
    usuarios_activos:number,
    usuarios_inactivos:number,
    usuarios_registro_hoy:number,
    usuarios_buscando_chat:number,
}