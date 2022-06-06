import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { AdminService } from '../../services/admin/admin.service';
import { ChatService } from '../../services/chat/chat.service';
import { ChatStadistics } from '../../shared/models/chatModel';
import { MensajeStadistics } from '../../shared/models/mensajeModel';
import { UsuarioStadistics } from '../../shared/models/usuarioModel';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-zona-admin',
  templateUrl: './zona-admin.component.html',
  styleUrls: ['./zona-admin.component.scss']
})
export class ZonaAdminComponent implements OnInit {
  abrirUsuario: boolean = false;
  abrirChat: boolean = false;
  abrirMensajes: boolean = false;
  chatStadistic!: ChatStadistics;
  mensajeStadistic!: MensajeStadistics;
  usuarioStadistic!: UsuarioStadistics;
  dateSelected: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

  constructor(private adminService: AdminService, private fb: FormBuilder,private datePipe: DatePipe) {}
  

  ngOnInit(): void {
    this.openStadistics();
  }
  
  openStadistics() {
    this.getChatsStadistics();
    this.getMensajesStadistics();
    this.getUsuariosStadistics();
  }

  openByDate(){
    console.log(this.dateSelected)
    this.getChatsStadisticsByDate();
    this.getMensajesStadisticsByDate();
    this.getUsuariosStadisticsByDate();
  }

  openUsuarios() {
    this.abrirChat = false;
    this.abrirMensajes = false;
    this.abrirUsuario = true;
  }

  openChats() {
    this.abrirMensajes = false;
    this.abrirUsuario = false;
    this.abrirChat = true;
  }
  openMensajes() {
    alert("Abriendo mensajes");
    this.abrirChat = false;
    this.abrirUsuario = false;
    this.abrirMensajes = true;
  }

  getChatsStadistics() {
    this.adminService.getAllChatsStadistics().subscribe({
      next: (data) => { this.chatStadistic = data ?? data },
      error: (error) => console.log("No se ha podido cargar las estadisticas del chat")
    });
  }

  getChatsStadisticsByDate() {
    this.adminService.getAllChatsStadisticsbyDate(this.dateSelected).subscribe({
      next: (data) => { this.chatStadistic = data ?? data },
      error: (error) => console.log("No se ha podido cargar las estadisticas del chat")
    });
  }

  getMensajesStadistics() {
    this.adminService.getAllMensajesStadistics().subscribe({
      next: (data) => { this.mensajeStadistic = data ?? data },
      error: (error) => console.log("No se ha podido cargar las estadisticas del chat")
    });
  }

  getMensajesStadisticsByDate(){
    this.adminService.getAllMensajesStadisticsbyDate(this.dateSelected).subscribe({
      next: (data) => { this.mensajeStadistic = data ?? data },
      error: (error) => console.log("No se ha podido cargar las estadisticas del chat por fecha")
    });;
  }

  getUsuariosStadistics() {
    this.adminService.getAllUsuariosStadistics().subscribe({
      next: (data) => { this.usuarioStadistic = data ?? data },
      error: (error) => console.log("No se ha podido cargar las estadisticas del chat")
    });
  }

  getUsuariosStadisticsByDate(){
    this.adminService.getAllUsuariosStadisticsbyDate(this.dateSelected).subscribe({
      next: (data) => { this.usuarioStadistic = data ?? data },
      error: (error) => console.log("No se ha podido cargar las estadisticas del chat por fecha")
    });;
  }
}
