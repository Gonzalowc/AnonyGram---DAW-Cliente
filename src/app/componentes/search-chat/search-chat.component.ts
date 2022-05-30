import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isChecked:boolean = false;
  checkBoxForm!: FormGroup;
  @Output() nuevoChat: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private chatService:ChatService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id_usuario = JSON.parse(getData("sesion")).id_usuario;
    this.checkBoxForm = this.fb.group({
      checkbox: [false],
    });
  }

  buscarChat() {
    this.nuevoChat.emit(true);
    this.isChecked = true;
  }
  click() {
    if (!this.isChecked) {
      this.buscarChat();
    }
  }

}
