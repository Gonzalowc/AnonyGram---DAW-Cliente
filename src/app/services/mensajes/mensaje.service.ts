import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { AllMensajesCompleto, MensajeCompleto } from 'src/app/shared/models/mensajeModel';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  disabled = true;
  private stompClient!: CompatClient;
  mensaje_response$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  baseUrl: string = environment.BASE_URL;

  constructor(private http:HttpClient){}


  getAllMensajes(usuario: number): Observable<AllMensajesCompleto[]> {
    let httpParams = new HttpParams();
    httpParams.set('idUsuario',usuario);
    return this.http.get<AllMensajesCompleto[]>(this.baseUrl + `/mensaje/all?idUsuario=${usuario}`)
  }


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
      _this.stompClient.subscribe("/topic/hi", function(mensajeResponse){
        _this.mensaje_response$.next(JSON.parse(mensajeResponse.body));
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

  async sendMessage(mensaje:MensajeCompleto){
    if(this.disabled){
      await this.connect();
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
