import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { ChatCompleto } from 'src/app/shared/models/chatModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  connected = true;
  ChatResponse!:ChatCompleto;
  private stompClient!: CompatClient;
  chat_response$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  
  private baseUrl:string = environment.BASE_URL;
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    })}

  constructor(private http:HttpClient) { }

  getAllChats(usuario: number): Observable<ChatCompleto[]> {
    let httpParams = new HttpParams();
    httpParams.set('idUsuario',usuario);
    return this.http.get<ChatCompleto[]>(this.baseUrl + `/chat/all?idUsuario=${usuario}`, {params: httpParams});
  }

  setConnected(connected: boolean) {
    this.connected = !connected;
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: string){
      _this.setConnected(true);
      console.log("Connected: "+frame);
      _this.stompClient.subscribe("/topic/newChat", (chatResponse) =>{
        console.log("Respuesta: "+chatResponse.body);
        _this.chat_response$.next(JSON.parse(chatResponse.body));
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

  createNewChat(chat:any){
    console.log("chat: "+chat);
    if(chat!=null && chat != undefined){
      this.stompClient.send(
        '/gkz/newChat',
        {},
        JSON.stringify(chat)
      );
    }
  }

  getAllChatsAdmin(): Observable<ChatCompleto[]>{
    return this.http.get<ChatCompleto[]>(this.baseUrl + "/admin/chat/allChats");
  }
}
