import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getData } from 'src/app/componentes/chat/chat.component';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(): boolean {
    const user:UsuarioCompleto = JSON.parse(getData("sesion"));
    console.log("Puedo entrar?")
    if(!user){
      console.log("no")
      this.router.navigate(['login']);
      return false;
    }
    if(user.rol == 'USER' || user.rol == 'ADMIN'){
      console.log("Si")
      return true;
    }else{
      console.log("Tu me intentas trollear?")
      return false;
    }
  }
}
