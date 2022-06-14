import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getData } from 'src/app/componentes/chat/chat.component';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(): boolean {
    const user:UsuarioCompleto = JSON.parse(getData("sesion"));
    if(!user){
      this.router.navigate(['login']);
      return false;
    }
    if(user.rol == 'ADMIN'){
      return true;
    }else{
      this.router.navigate(['chat']);
      return false;
    }
  }
}
