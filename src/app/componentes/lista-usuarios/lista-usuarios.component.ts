import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { AdminService } from 'src/app/services/admin/admin.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UsuarioCompleto } from '../../shared/models/usuarioModel';
import { UpdateUsuarioComponent } from '../update-usuario/update-usuario.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  datos: boolean = true;
  displayedColumns = ["id", "nombre", "usuario", "rol", "registro", "buscando", "actions"];
  usuarioSelect!: UsuarioCompleto;
  listaUsuarios: UsuarioCompleto[] = [];
  dialogRef!:MatDialog | undefined;

  constructor(private usuarioService: UsuarioService, private adminService: AdminService, private dialog: MatDialog) { this.getAllUsuarios(); }
  ngOnInit(): void {
  }
  getAllUsuarios() {
    this.usuarioService.getAllUser().subscribe({
      next: (data) => this.listaUsuarios = data,
      error: (error) => console.log("No se han podido cargar los usuarios")
    });

  }
  comprobarDatos() {
    if (this.listaUsuarios.length > 0) {
      this.datos = true;
    } else {
      this.datos = false;
    }
  }

  changeSearchChat(usuario: UsuarioCompleto) {
    this.adminService.updateSearchChat(usuario.id_usuario).subscribe({
      next: (data) => {
        this.listaUsuarios.forEach((element) => {
          if (element.id_usuario == usuario.id_usuario) {
            element.active_new_chat = !element.active_new_chat;
          }
        })
      }
    });
  }
  changeActive(usuario:UsuarioCompleto){
    this.adminService.updateActivoUsuario(usuario.id_usuario).subscribe({
      next: (data) => {
        this.listaUsuarios.forEach((element) => {
          if (element.id_usuario == usuario.id_usuario) {
            element.activo = !element.activo;
          }
        })
      }
    })
  }

  openDialogEdit(usuario:UsuarioCompleto){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(UpdateUsuarioComponent, {
      data: usuario
    });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.listaUsuarios.forEach(element => {
            if (element.id_usuario == data.id_usuario) {
              element = data;
            }
          });
        }else{
          console.log("Cancelada la edición")
        }
      }
    });
  }
}



