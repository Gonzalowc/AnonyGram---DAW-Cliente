import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatModel } from 'src/app/shared/models/chatModel';
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
  @Input() chat!:ChatModel;
  @Input() idUsuario!:number;
  @Output() mensajeReceived: EventEmitter<MensajeCompleto> = new EventEmitter<MensajeCompleto>();
 
  constructor(private fb:FormBuilder) {
    this.sendMensajeForm = this.fb.group({
      mensaje: ['', Validators.required ]
    });
   }

  ngOnInit(){}
  
  sendMensaje() {
    this.mensajeToSend = {
      active: true, 
      mensaje: this.sendMensajeForm.get(["mensaje"])?.value,
      timestamp: new Date(),
      id_chat: this.chat.id_chat,
      id_usuario: this.idUsuario,
      reported: false,
    }
    this.mensajeReceived.emit(this.mensajeToSend);
    this.sendMensajeForm.get(["mensaje"])?.setValue('');
   }
}


