import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { getData } from 'src/app/componentes/chat/chat.component';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user:UsuarioCompleto = JSON.parse(getData("sesion"));
    console.log(state.url)
    console.log("route" + route.url)
    if(!user){
      this.router.navigate(['login']);
      return false;
    }
    if(user.rol == 'USER' && state.url == "/redirect"){
      this.router.navigate(['chat']);
      return true;
    }else if(user.rol == 'USER' && state.url != "/redirect"){
      return true
    }else if(user.rol == 'ADMIN' && state.url == "/redirect"){
      this.router.navigate(['admin']);
      return true;
    } else if(user.rol == 'ADMIN' && state.url != "/redirect"){
      return true;
    }else{
      return false;
    }
   
  }
}
