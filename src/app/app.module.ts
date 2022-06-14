import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './componentes/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './componentes/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoChatComponent } from './componentes/info-chat/info-chat.component';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { InfoUserComponent } from './componentes/info-user/info-user.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { SendMessageComponent } from './componentes/send-message/send-message.component';
import { SearchChatComponent } from './componentes/search-chat/search-chat.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
// import { CanActivateAuthInstaService } from './services/can-activate-auth-insta.service';
import { MatInputModule } from '@angular/material/input';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { UsuarioService } from './services/usuario/usuario.service';
import { MensajeService } from './services/mensajes/mensaje.service';
import { ChatService } from './services/chat/chat.service';
import { AdminService } from './services/admin/admin.service';
import { RouterModule } from '@angular/router';
import { ZonaAdminComponent } from './componentes/zona-admin/zona-admin.component';
import { ListaChatsComponent } from './componentes/lista-chats/lista-chats.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateUsuarioComponent } from './componentes/update-usuario/update-usuario.component';
import { UpdateChatComponent } from './componentes/update-chat/update-chat.component';
import { MatTooltipModule, TooltipComponent } from '@angular/material/tooltip';
import { ListaMensajesComponent } from './componentes/lista-mensajes/lista-mensajes.component';


const config: SocketIoConfig = {url: 'http://localhost:8080', options: {}};
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    InfoChatComponent,
    InfoUserComponent,
    LoginComponent,
    MensajesComponent,
    RegisterComponent,
    SearchChatComponent,
    SendMessageComponent,
    ZonaAdminComponent,
    ListaChatsComponent,
    ListaUsuariosComponent,
    UpdateUsuarioComponent,
    UpdateChatComponent,
    ListaMensajesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule, 
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    SocketIoModule.forRoot(config),
    RouterModule,
    MatTableModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  providers: [
    UsuarioService,
    MensajeService,
    ChatService,
    AdminService,
    DatePipe,
  ],
  bootstrap: [AppComponent,],

})
export class AppModule { }

