import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatCompleto, ChatModel } from 'src/app/shared/models/chatModel';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';
import { InfoChatComponent } from '../info-chat/info-chat.component';
import { SearchChatComponent } from '../search-chat/search-chat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  //info chat
  @ViewChild(InfoChatComponent) chatToOpen!:InfoChatComponent;
  userLogging!:UsuarioCompleto;
  // Lista de chats --> info Chat
  infoChat!:ChatModel[];
  //Lista de mensajes de chat --> mensajes
  mensajes?:MensajeCompleto[];
  allMensajes?:Map<number, MensajeCompleto[]>;
  //Chat seleccionado --> Mensaje
  chatSelected!:ChatModel;
  @ViewChild(SearchChatComponent) newChat!:SearchChatComponent;
  
  constructor() { }

  ngOnInit(): void {
    let value:string = getData("sesion");
    console.log("VALUE: "+value)
    if(value){
      this.userLogging =  JSON.parse(value);


      console.log("CHAT LOGIN: "+this.userLogging.name)
    }
    this.allMensajes = new Map<number,MensajeCompleto[]>();
    this.infoChat = [
      {
        "id_chat":1
        ,"nombre_chat":"Gonzalo"
        ,"id_usuario_creador":1
        ,"id_usuario_respuesta":2
        ,"ultimo_mensaje":"Te pepinillo",
        "timestamp": "",
        "imagen":"https://img.fotocommunity.com/atardeceres-1b2829bd-e28f-47e5-9a55-8d9988f8e184.jpg?height=1080"
      },
      {
        "id_chat":2
        ,"nombre_chat":"Maria"
        ,"id_usuario_creador":3
        ,"id_usuario_respuesta":1
        ,"ultimo_mensaje":"y yo",
        "timestamp": "",
        "imagen":"https://material.angular.io/assets/img/examples/shiba1.jpg"
      }
    ];
    this.allMensajes.set(1,[{"active": true
    ,"mensaje": "Mensaje parseado"
    ,"timestamp": new Date(2022,5,3,13,45,2)
    ,"id_chat": 1
    ,"id_usuario": 1}, {"active": true
    ,"mensaje": "Mensaje parseado usuario 2"
    ,"timestamp":new Date(2022,5,3,13,43,2)
    ,"id_chat": 1
    ,"id_usuario": 2}]);
    this.allMensajes.set(2, [{"active": true
    ,"mensaje": "Mensaje parseado usuario 2"
    ,"timestamp":new Date(2022,5,3,13,43,2)
    ,"id_chat": 2
    ,"id_usuario": 2},
    {"active": true
    ,"mensaje": "Mensaje parseado usuario 2"
    ,"timestamp":new Date(2022,5,3,13,43,2)
    ,"id_chat": 2
    ,"id_usuario": 1}
    ]);
  }
  
  // Get clicked info-chat
  openChat(chatModel: ChatModel):void{
    this.chatSelected = chatModel;
    this.filterMessagesByChatSelected();
  }

  // filtrar mensajes por chat seleccionado
  filterMessagesByChatSelected() {
    if(this.chatSelected != undefined && this.allMensajes != undefined){
      this.mensajes = this.allMensajes.get(this.chatSelected.id_chat);
    }
  }
}
export function saveData(variable: string, valor: any){
  console.log("Datos guardados en sesion")
  sessionStorage.setItem(variable, valor);
}
export function getData(variable: string):any{
  return sessionStorage.getItem(variable)
}

function sortByLastModifiedAsendMensaje(array:any) {
  return array.sort((a: any, b: any) => {
    return <any>new Date(b.timestamp) - <any>new Date(a.timestamp);
  });
}

function sortByLastModifiedAsendChat(array:any) {
  return array.sort((a: any, b: any) => {
    return <any>new Date(b.timestamp) - <any>new Date(a.timestamp);
  });
}
