import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatModel } from 'src/app/shared/models/chatModel';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';
import { InfoChatComponent } from '../info-chat/info-chat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  //info chat
  @ViewChild(InfoChatComponent) chatToOpen!:InfoChatComponent;

  // Lista de chats --> info Chat
  infoChat!:ChatModel[];
  //Lista de mensajes de chat --> mensajes
  mensajes?:MensajeCompleto[];

  allMensajes?:Map<number, MensajeCompleto[]>;
  
  //Chat seleccionado --> Mensaje
  chatSelected!:ChatModel;
  userSelected!:ChatModel;

  
  constructor() { }

  ngOnInit(): void {
    this.allMensajes = new Map<number,MensajeCompleto[]>();
    this.infoChat = [
      {
        "id_chat":1
        ,"nombre_chat":"Gonzalo"
        ,"id_usuario_creador":1
        ,"id_usuario_respuesta":2
        ,"ultimo_mensaje":"Te pepinillo",
        "imagen":"https://img.fotocommunity.com/atardeceres-1b2829bd-e28f-47e5-9a55-8d9988f8e184.jpg?height=1080"
      },
      {
        "id_chat":2
        ,"nombre_chat":"Maria"
        ,"id_usuario_creador":3
        ,"id_usuario_respuesta":1
        ,"ultimo_mensaje":"y yo",
        "imagen":"https://material.angular.io/assets/img/examples/shiba1.jpg"
      }
    ];
    this.allMensajes.set(1,[{"id_mensaje": 2300
    ,"active": true
    ,"mensaje": "Mensaje parseado"
    ,"timestamp": new Date(2022,5,3,13,45,2)
    ,"id_chat": 1
    ,"id_usuario": 1}, {"id_mensaje": 2303
    ,"active": true
    ,"mensaje": "Mensaje parseado usuario 2"
    ,"timestamp":new Date(2022,5,3,13,43,2)
    ,"id_chat": 1
    ,"id_usuario": 2}]);
    this.allMensajes.set(2, [{"id_mensaje": 2301
    ,"active": true
    ,"mensaje": "Mensaje parseado usuario 2"
    ,"timestamp":new Date(2022,5,3,13,43,2)
    ,"id_chat": 2
    ,"id_usuario": 2},
    {"id_mensaje": 2302
    ,"active": true
    ,"mensaje": "Mensaje parseado usuario 2"
    ,"timestamp":new Date(2022,5,3,13,43,2)
    ,"id_chat": 2
    ,"id_usuario": 1}
    ]);
  }
  
  // Get clicked info-chat
  openChat(chatModel: ChatModel):void{
    this.chatSelected = chatModel;
    this.userSelected = chatModel;
    this.filterMessagesByChatSelected();
  }

  // filtrar mensajes por chat seleccionado
  filterMessagesByChatSelected() {
    if(this.chatSelected != undefined && this.allMensajes != undefined){
      this.mensajes = this.allMensajes.get(this.chatSelected.id_chat);
    }
  }
}

