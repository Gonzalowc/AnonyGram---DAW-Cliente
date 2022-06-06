import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ChatCompleto } from 'src/app/shared/models/chatModel';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';

@Component({
  selector: 'app-update-chat',
  templateUrl: './update-chat.component.html',
  styleUrls: ['./update-chat.component.scss']
})
export class UpdateChatComponent implements OnInit {
  updateChat!: FormGroup;
  chatSelected!: ChatCompleto;
  usuarioCreador!: UsuarioCompleto;
  usuarioRespuesta!: UsuarioCompleto;
  constructor(public dialogRef: MatDialogRef<UpdateChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChatCompleto,
    private fb: FormBuilder,
    private adminService: AdminService,
    private usuarioService: UsuarioService) {
      this.getUsuarioCreadorById(this.data);
      this.createForm("","",data);
    this.chatSelected = data;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm(uCreador: string, uRespuesta: string, chat: ChatCompleto) {
    this.updateChat = this.fb.group({
      id: [1, Validators.required],
      ncreador: [ chat.nombre_chat_creador, Validators.required],
      nrespuesta: [chat.nombre_chat_respuesta, Validators.required],
      icreador: [uCreador, Validators.required],
      irespuesta: [uRespuesta, Validators.required],
      registro: [chat.fecha_creacion, Validators.required],
    });

    /*this.updateUsuario = this.fb.group({
      id: [this.data.id_usuario, Validators.required],
      name: [this.data.name, Validators.required],
      usuario: [this.data.usuario, Validators.required],
      rol: [this.data.rol, Validators.required],
      registro: [this.data.registro, Validators.required],
    })*/
  }

  updateChatDB() {
    let nCreador = this.updateChat.get(["ncreador"])?.value;
    let nRespuesta = this.updateChat.get(["nrespuesta"])?.value;
    console.log(nCreador+" -- "+nRespuesta)
    this.chatSelected.nombre_chat_creador = nCreador;
    this.chatSelected.nombre_chat_respuesta = nRespuesta;
    this.adminService.updateChat(this.chatSelected).subscribe({
      next: (data) => this.chatSelected = data ? this.chatSelected : this.data,
      error: (error) => console.log("No se ha podido actualizar el chat")
    })
    this.data = this.chatSelected;
  }

  getUsuarioCreadorById(chat: ChatCompleto) {
    this.usuarioService.getUser(chat.id_usuario_creador).subscribe({
      next: (data) => {
        this.usuarioCreador = data;
        this.getUsuarioRespuestaById(chat);
      },
      error: (error) => console.log("No se ha podido recuperar el usuario")
    })
  }

  getUsuarioRespuestaById(chat: ChatCompleto) {
    this.usuarioService.getUser(chat.id_usuario_respuesta).subscribe({
      next: (data) => {
        this.usuarioRespuesta = data;
        this.createForm(this.usuarioCreador.usuario, data.usuario, chat)
      },
      error: (error) => console.log("No se ha podido recuperar el usuario"),
    })
  }
}
