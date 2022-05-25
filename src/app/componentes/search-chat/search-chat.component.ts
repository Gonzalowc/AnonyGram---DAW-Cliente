import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ChatCompleto } from 'src/app/shared/models/chatModel';
import { getData } from '../chat/chat.component';

@Component({
  selector: 'app-search-chat',
  templateUrl: './search-chat.component.html',
  styleUrls: ['./search-chat.component.scss']
})
export class SearchChatComponent implements OnInit {
  id_usuario!:any;
  @Output() nuevoChat: EventEmitter<ChatCompleto> = new EventEmitter<ChatCompleto>();
  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.id_usuario = JSON.parse(getData("sesion")).id_usuario;
  }

  buscarChat() {
    console.log("Usuario: "+this.id_usuario)
    this.chatService.sendMessage({id_usuario: this.id_usuario});
    this.nuevoChat.emit(this.chatService.ChatResponse);
   }

}
