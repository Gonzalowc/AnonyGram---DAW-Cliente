import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async, Observable, startWith, Subscription } from 'rxjs';

import { MensajeService } from 'src/app/services/mensajes/mensaje.service';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  sendMensajeForm: FormGroup;
  mensajeToSend!: MensajeCompleto;
  // mensaje recibido que se envia a chat
  mensajeToChat!:MensajeCompleto;
  @Input() idChat!:number;
  @Input() idUsuario!:number;
  @Output() mensajeReceived: EventEmitter<MensajeCompleto> = new EventEmitter<MensajeCompleto>();
 
  constructor(private fb:FormBuilder) {
    this.sendMensajeForm = this.fb.group({
      mensaje: ['', Validators.required ]
    });
   }

  ngOnInit(){}
  
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
    console.log(this.mensajeToSend);
    this.mensajeReceived.emit(this.mensajeToSend);
    this.sendMensajeForm.get(["mensaje"])?.setValue('');
   }
}


