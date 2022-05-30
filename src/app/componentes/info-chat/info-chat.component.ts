import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatModel } from 'src/app/shared/models/chatModel';

@Component({
  selector: 'app-info-chat',
  templateUrl: './info-chat.component.html',
  styleUrls: ['./info-chat.component.scss']
})
export class InfoChatComponent implements OnInit {
  // Información del chat 
  @Input() dataChats!:ChatModel;
  // Enviar chat seleccionado
  @Output() selectChat: EventEmitter<ChatModel> = new EventEmitter<ChatModel>();

  constructor() {}

  ngOnInit(): void {
  }

  openChat(dataChat: ChatModel){
    console.log(dataChat);
    this.selectChat.emit(dataChat);
  }
}
