import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatCompleto } from 'src/app/shared/models/chatModel';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  disabled = true;
  ChatResponse!:ChatCompleto;
  private stompClient!: CompatClient;

  constructor(){}

  setConnected(connected: boolean) {
    this.disabled = !connected;
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: string){
      _this.setConnected(true);
      console.log("Connected: "+frame);
      _this.stompClient.subscribe("/topic/newChat", (mensajeResponse) =>{
        console.log("Respuesta: "+mensajeResponse.body);
        _this.ChatResponse = JSON.parse(mensajeResponse.body);
        _this.disconnect();
      });
    });
  }

  disconnect(){
    if(this.stompClient != null){
      this.stompClient.disconnect();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  sendMessage(mensaje:any){
    if(this.disabled){
      this.connect();
    }
    console.log("mensaje: "+mensaje);
    if(mensaje!=null && mensaje != undefined){
      this.stompClient.send(
        '/gkz/newChat',
        {},
        JSON.stringify(mensaje)
      );
    }
  }
}
