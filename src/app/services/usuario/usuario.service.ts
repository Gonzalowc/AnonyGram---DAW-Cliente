import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { UsuarioCompleto, UsuarioLogin, UsuarioRegister } from 'src/app/shared/models/usuarioModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private baseUrl:string = environment.BASE_URL;
  private usuario!:UsuarioCompleto;
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    })}

  constructor(private http:HttpClient, private header:HttpClient) { }

  registerUser(usuario: UsuarioRegister): Observable<UsuarioCompleto> {
    return this.http.post<UsuarioCompleto>(this.baseUrl + '/usuario/register', usuario)
  }

  loginUser(usuario: UsuarioLogin): Observable<UsuarioCompleto> {
    return this.http.post<UsuarioCompleto>(this.baseUrl + '/usuario/login', usuario)
  }
}
