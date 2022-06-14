import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MensajeService } from 'src/app/services/mensajes/mensaje.service';
import { ChatModel } from 'src/app/shared/models/chatModel';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';
import { getData } from '../chat/chat.component';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  @Input() selectedChat!:ChatModel;
  @Input() mensajesChat!:MensajeCompleto[];
  usuarioLogged!:UsuarioCompleto

  constructor(private mensajeService:MensajeService) { }

  ngOnInit(): void {
    this.usuarioLogged = JSON.parse(getData("sesion"));
  }

  banMensaje(mensaje:MensajeCompleto){
    if(mensaje.id_mensaje){
      this.mensajeService.banMessage(this.usuarioLogged.id_usuario, mensaje.id_mensaje).subscribe({
        next: (data) => data ? mensaje.reported = true : mensaje.reported,
        error: (error) => console.log("No se ha podido banear este mensaje")
      });
    }
  }

  changeActive(mensaje:MensajeCompleto){
    if(mensaje.id_mensaje){
      this.mensajeService.changeActiveMessage(this.usuarioLogged.id_usuario, mensaje.id_mensaje).subscribe({
        next: (data) => data ? mensaje.active = !mensaje.active : mensaje.active,
        error: (error) => console.log("No se ha podido cambiar el estado de este mensaje")
      })
    }
  }
}
