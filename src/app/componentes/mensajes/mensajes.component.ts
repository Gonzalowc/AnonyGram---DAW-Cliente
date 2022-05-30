import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input() mensajesChat!:MensajeCompleto;
  usuarioLogged!:UsuarioCompleto

  constructor() { }

  ngOnInit(): void {
    this.usuarioLogged = JSON.parse(getData("sesion"));
  }
}
