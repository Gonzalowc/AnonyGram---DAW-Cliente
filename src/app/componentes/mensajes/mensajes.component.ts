import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChatModel } from 'src/app/shared/models/chatModel';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  @Input() selectedChat!:ChatModel;
  @Input() mensajesChat!:MensajeCompleto;
  usuarioLogged!:UsuarioCompleto

  constructor() { }

  ngOnInit(): void {
    this.usuarioLogged = {
      "id_usuario": 1
       ,"activo": true
       ,"name": "Gonzalo"
       ,"rol": "User"
       ,"usuario": "Gonxalosfc"
    }
  }
}
