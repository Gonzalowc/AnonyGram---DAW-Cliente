import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AuthguardService } from './services/security/authguard.service';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { ZonaAdminComponent } from './componentes/zona-admin/zona-admin.component';
import { ListaChatsComponent } from './componentes/lista-chats/lista-chats.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "chat", component: ChatComponent, canActivate: [AuthguardService]},
  {path: "admin", component: ZonaAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FontAwesomeModule]
})
export class AppRoutingModule { }
