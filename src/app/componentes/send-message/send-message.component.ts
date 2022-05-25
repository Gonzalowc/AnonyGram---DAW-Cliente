import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, startWith, Subscription } from 'rxjs';

import { MensajeService } from 'src/app/services/mensajes/mensaje.service';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit, OnDestroy {
  sendMensajeForm: FormGroup;
  mensajeToSend!: MensajeCompleto;
  @Input() idChat!:number;
  @Input() idUsuario!:number;

  constructor(private mensajeService: MensajeService, private fb:FormBuilder) {
    this.sendMensajeForm = this.fb.group({
      mensaje: ['', Validators.required ]
    });
   }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.mensajeService.connect();
    /*this.mensaje = {
      "active": true,
      "mensaje": this.sendMensajeForm.get(["mensaje"])?.value,
      "timestamp": new Date(),
      "id_chat": this.idChat,
      "id_usuario": this.idUsuario};*/
  }

  sendMensaje() {
    console.log("Chat: "+this.idChat);
    console.log("Usuario: "+this.idUsuario)
    this.mensajeToSend = {
      active: true, 
      mensaje: this.sendMensajeForm.get(["mensaje"])?.value,
      timestamp: new Date(),
      id_chat: this.idChat,
      id_usuario: this.idUsuario,
    }
    this.mensajeService.sendMessage(this.mensajeToSend);
   }
}


