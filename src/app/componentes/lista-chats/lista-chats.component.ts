import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';
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
  constructor(private chatService:ChatService, private dialog: MatDialog, private adminService:AdminService) {this.getAllChats() }

  ngOnInit(): void {
  }
  comprobarDatos() {
    if (this.listaChats.length > 0) {
      this.datos = true;
    } else {
      this.datos = false;
    }
  }

  getAllChats(){
    this.chatService.getAllChatsAdmin().subscribe({
      next: (data) => {
        this.listaChats = data
        this.comprobarDatos()},
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
              console.log("Cambio");
              element = data;
            }
          });
        }else{
          console.log("Cancelada la edición")
        }
      }
    });
  }

  changeActive(chat:ChatCompleto){
    this.adminService.updateActivochat(chat.id_chat).subscribe({
      next: (data) => {
        this.listaChats.forEach((element) => {
          if (element.id_chat == chat.id_chat) {
            element.activo = !element.activo;
          }
        })
      }
    })
  }

}
