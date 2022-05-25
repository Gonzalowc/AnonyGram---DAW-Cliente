import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';
import { CompatClient, Stomp } from '@stomp/stompjs';
@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  disabled = true;
  private stompClient!: CompatClient;

  constructor(){}

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if(connected) {
      
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: string){
      _this.setConnected(true);
      console.log("Connected: "+frame);
      _this.stompClient.subscribe("/topic/hi", function(mensajeResponse){
        console.log("Respuesta: "+mensajeResponse.body);
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

  sendMessage(mensaje:MensajeCompleto){
    if(this.disabled){
      this.connect();
    }
    console.log("mensaje: "+JSON.stringify(mensaje));
    if(mensaje!=null && mensaje != undefined){
      this.stompClient.send(
        '/gkz/hello',
        {},
        JSON.stringify(mensaje)
      );
    }
  }

}
