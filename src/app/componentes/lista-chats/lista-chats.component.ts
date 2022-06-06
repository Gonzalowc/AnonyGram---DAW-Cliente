import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ChatCompleto } from 'src/app/shared/models/chatModel';
import { UpdateChatComponent } from '../update-chat/update-chat.component';

@Component({
  selector: 'app-lista-chats',
  templateUrl: './lista-chats.component.html',
  styleUrls: ['./lista-chats.component.scss']
})
export class ListaChatsComponent implements OnInit {
  datos: boolean = true;
  displayedColumns = [
  "id", "nombreCreador", 
  "nombreRespuesta", "imagen", 
  "mensajes","creacion", "actions"];
  chatSelect!: ChatCompleto;
  listaChats: ChatCompleto[] = [];
  constructor(private chatService:ChatService, private dialog: MatDialog) {this.getAllChats() }

  ngOnInit(): void {
  }

  getAllChats(){
    this.chatService.getAllChatsAdmin().subscribe({
      next: (data) => {
        console.log(data);
        this.listaChats = data},
    })
  }

  openDialogEdit(chat:ChatCompleto){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(UpdateChatComponent, {
      data: chat
    });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.listaChats.forEach(element => {
            if (element.id_chat == data.id_chat) {
              element = data;
            }
          });
        }else{
          console.log("Cancelada la edición")
        }
      }
    });
  }

}
