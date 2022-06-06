import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatCompleto, ChatStadistics } from 'src/app/shared/models/chatModel';
import { MensajeStadistics } from 'src/app/shared/models/mensajeModel';
import { UsuarioStadistics, UsuarioCompleto } from 'src/app/shared/models/usuarioModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    
  private baseUrl:string = environment.BASE_URL;
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    })};

  constructor(private http:HttpClient) { }

  getAllChatsStadistics(): Observable<ChatStadistics> {
    return this.http.get<ChatStadistics>(this.baseUrl + '/admin/chat/stadistics');
  }

  getAllChatsStadisticsbyDate(date:Date): Observable<ChatStadistics> {
    let httpParams = new HttpParams();
    httpParams.set('date',date.toLocaleString());
    return this.http.get<ChatStadistics>(this.baseUrl + `/admin/chat/stadistics?date=${date}`, {params: httpParams});
  }

  getAllMensajesStadistics(): Observable<MensajeStadistics> {
    return this.http.get<MensajeStadistics>(this.baseUrl + "/admin/mensaje/stadistics");
  }

  getAllMensajesStadisticsbyDate(date:Date): Observable<MensajeStadistics> {
    let httpParams = new HttpParams();
    httpParams.set('date',date.toLocaleString());
    return this.http.get<MensajeStadistics>(this.baseUrl + `/admin/mensaje/stadistics?date=${date}`, {params: httpParams});
  }
  
  getAllUsuariosStadistics(): Observable<UsuarioStadistics> {
    return this.http.get<UsuarioStadistics>(this.baseUrl + "/admin/usuario/stadistics");
  }

  getAllUsuariosStadisticsbyDate(date:Date): Observable<UsuarioStadistics> {
    let httpParams = new HttpParams();
    httpParams.set('date',date.toLocaleString());
    return this.http.get<UsuarioStadistics>(this.baseUrl + `/admin/usuario/stadistics?date=${date}`, {params: httpParams});
  }

  updateUser(usuario:UsuarioCompleto): Observable<UsuarioCompleto> {
    return this.http.post<UsuarioCompleto>(this.baseUrl + '/admin/usuario/update', usuario);
  }

  updateChat(chat:ChatCompleto): Observable<ChatCompleto> {
    return this.http.post<ChatCompleto>(this.baseUrl + "/admin/chat/update", chat)
  }

  updateSearchChat(idUsuario:number): Observable<boolean>{
    let httpParams = new HttpParams();
    httpParams.set('idUsuario', idUsuario);
    return this.http.get<boolean>(this.baseUrl + `/admin/usuario/searchChat?idUsuario=${idUsuario}`, {params: httpParams});
  }

  updateActivoUsuario(idUsuario:number):Observable<boolean>{
    let httpParams = new HttpParams();
    httpParams.set('idUsuario', idUsuario);
    return this.http.get<boolean>(this.baseUrl + `/admin/usuario/active?idUsuario=${idUsuario}`, {params: httpParams});
  }
}
