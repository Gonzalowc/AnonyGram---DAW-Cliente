export interface UsuarioCompleto {
    id_usuario: number,
    activo: boolean,
    name: string,
    rol: string,
    usuario: string,
    password?: string,
}