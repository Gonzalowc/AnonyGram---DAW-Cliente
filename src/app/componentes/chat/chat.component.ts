import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MensajeService } from 'src/app/services/mensajes/mensaje.service';
import { ChatCompleto, ChatModel } from 'src/app/shared/models/chatModel';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';
import { InfoChatComponent } from '../info-chat/info-chat.component';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { SearchChatComponent } from '../search-chat/search-chat.component';
import { SendMessageComponent } from '../send-message/send-message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  //<<<<<<<<<<info chat>>>>>>>>>>>>>>>>>>>>>
  @ViewChild(InfoChatComponent) chatToOpen!:InfoChatComponent;
  infoChat!:ChatModel[];
  chatSelected!:ChatModel;
  //<<<<<<<<<<Search chat>>>>>>>>>>>>>>>>>>>>>
  @ViewChild(SearchChatComponent) newChat!:SearchChatComponent;
  //<<<<<<<<<<Send message>>>>>>>>>>>>>>>>>>>>>
  @ViewChild(SendMessageComponent) newMessage!:SendMessageComponent;
  //Lista de mensajes de chat --> mensajes
  mensajes?:MensajeCompleto[];
  allMensajes:Map<number, MensajeCompleto[]> = new Map<number, MensajeCompleto[]>();
  //mensaje del componente
  mensaje?:MensajeCompleto;
  //USER
  userLogging!:UsuarioCompleto;
  //Chat seleccionado --> Mensaje
  
  constructor(private mensajeService: MensajeService, private chatService:ChatService) { }
  ngAfterViewInit(): void {
    console.log("Get all chats"+ this.userLogging.id_usuario)
    this.infoChat = this.getAllChats();
    this.getAllMensajes();
  }
   
   ngOnInit() {
    this.mensajeService.connect();
    this.chatService.connect();
     this.mensajeService.mensaje_response$.subscribe((value) => {
       this.getMessageResponse(value)
     });

     this.chatService.chat_response$.subscribe((value) => {
      this.getChatResponse(value);
     })
    
    let value:string = getData("sesion");
    if(value){
      this.userLogging =  JSON.parse(value);
      console.log("CHAT LOGIN: "+this.userLogging.name)
    }
    this.allMensajes = new Map<number,MensajeCompleto[]>();
    
    this.infoChat = [];
    /*this.infoChat = [
      {
        "id_chat":2
        ,"nombre_chat":"Gonzalo"
        ,"id_usuario_creador":1
        ,"id_usuario_respuesta":3
        ,"ultimo_mensaje":"Te pepinillo",
        "timestamp": "",
        "imagen":"https://img.fotocommunity.com/atardeceres-1b2829bd-e28f-47e5-9a55-8d9988f8e184.jpg?height=1080"
      },
      {
        "id_chat":3
        ,"nombre_chat":"Maria"
        ,"id_usuario_creador":3
        ,"id_usuario_respuesta":2
        ,"ultimo_mensaje":"y yo",
        "timestamp": "",
        "imagen":"https://material.angular.io/assets/img/examples/shiba1.jpg"
      }
    ];
     this.allMensajes.set(2, [{
       "active": true
       , "mensaje": "Mensaje parseado"
       , "timestamp": new Date(2022, 5, 3, 13, 45, 2)
       , "id_chat": 2
       , "id_usuario": 1
     }, {
       "active": true
       , "mensaje": "Mensaje parseado usuario 2"
       , "timestamp": new Date(2022, 5, 3, 13, 43, 2)
       , "id_chat": 2
       , "id_usuario": 3
     }, {
       "active": true
       , "mensaje": "Mensaje parseado usuario 2"
       , "timestamp": new Date(2022, 5, 3, 13, 43, 2)
       , "id_chat": 2
       , "id_usuario": 3
     },
     {
       "active": true
       , "mensaje": "Mensaje parseado usuario 2"
       , "timestamp": new Date(2022, 5, 3, 13, 43, 2)
       , "id_chat": 2
       , "id_usuario": 1
     }
     ]);*/
  }
  
  // Get clicked info-chat
  openChat(chatModel: ChatModel):void{
    this.chatSelected = chatModel;
    this.filterMessagesByChatSelected();
  }

  /*Get message from child component send-message*/
  getMessage(mensajeReceived: MensajeCompleto) {
    if (mensajeReceived.mensaje != '' && this.allMensajes?.has(mensajeReceived.id_chat)) {
      console.log("Envia mensaje")
      this.sendMensaje(mensajeReceived)
    }
    console.log("no envia mensaje")
  }

  getMessageResponse(mensajeReceived:MensajeCompleto){
    if (mensajeReceived && mensajeReceived.mensaje != '' && this.allMensajes?.has(mensajeReceived.id_chat)) {
      this.allMensajes.get(mensajeReceived.id_chat)?.push(mensajeReceived);
      this.infoChat.forEach((chat, index) =>{ 
        if(chat.id_chat == mensajeReceived.id_chat){
          chat.ultimo_mensaje = mensajeReceived.mensaje;
        }
      } )
    }
    this.filterMessagesByChatSelected();
  }

  getChatResponse(chat:ChatCompleto){
    if (chat != null) {
      let chatmodel:ChatModel = {
        "id_chat": chat.id_chat,
        "nombre_chat": this.nombreChat(chat),
        "fecha_ultimo_mensaje": chat.fecha_ultimo_mensaje,
        "id_usuario_creador": chat.id_usuario_creador,
        "id_usuario_respuesta": chat.id_usuario_respuesta,
        "ultimo_mensaje": "No hay mensajes",
        "timestamp": chat.fecha_creacion.toString(),
        "imagen": chat.imagen,
      }
      if(chatmodel.id_usuario_creador == this.userLogging.id_usuario || 
        chatmodel.id_usuario_respuesta == this.userLogging.id_usuario){
          this.infoChat.push(chatmodel);
          this.initAllMensajes(chatmodel, []);
        }
    }
  }

  initAllMensajes(chat:ChatModel, mensajes:MensajeCompleto[]) {
    this.initAllMensajesId(chat.id_chat,mensajes);
  }

  initAllMensajesId(idChat:number, mensajes:MensajeCompleto[]){
    this.allMensajes.set(idChat, mensajes);
  }

  private nombreChat(chat:ChatCompleto):any {
    if(this.userLogging.id_usuario == chat.id_usuario_creador){
      return chat.nombre_chat_creador;
    }else{
      return chat.nombre_chat_respuesta;
    }
  }

  sendMensaje(mensaje:MensajeCompleto) {
    this.mensajeService.sendMessage(mensaje);
  }

  createChat(idUsuario:boolean){
    if(idUsuario){
      this.chatService.createNewChat({"id_usuario": this.userLogging.id_usuario});
    }
  }

  getAllChats(): ChatModel[] {
    let chatModels:ChatModel[] = [];
    this.chatService.getAllChats(this.userLogging.id_usuario).subscribe({
      next: (chats) => {
        console.log("buscando chats")
        chats.forEach(chat => {
          let chatModel:ChatModel = {
            "id_chat": chat.id_chat,
            "nombre_chat": this.nombreChat(chat),
            "fecha_ultimo_mensaje": chat.fecha_ultimo_mensaje,
            "id_usuario_creador": chat.id_usuario_creador,
            "id_usuario_respuesta": chat.id_usuario_respuesta,
            "ultimo_mensaje": chat.ultimo_mensaje,
            "timestamp": chat.fecha_creacion.toString(),
            "imagen": chat.imagen,
          }
          this.initAllMensajes(chatModel, []);
          chatModels.push(chatModel);
        });
      }
    })
    return chatModels;
  }

  getAllMensajes(){
    this.mensajeService.getAllMensajes(this.userLogging.id_usuario).subscribe({
      next: (mensajes) => {
        mensajes.forEach((mensaje) => {
          console.log(mensaje);
          console.log(this.allMensajes)
          if(mensaje.listMensajes!=undefined){
            this.initAllMensajesId(mensaje.idChat, mensaje.listMensajes);
          }else{
            this.initAllMensajesId(mensaje.idChat, []);
          }
        })
      }
    })
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
