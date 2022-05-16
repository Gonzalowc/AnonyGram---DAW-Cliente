import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './componentes/login/login.component';
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
  ],
  imports: [
    BrowserModule,
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
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
