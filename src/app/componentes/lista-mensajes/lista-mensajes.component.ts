import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AdminService } from 'src/app/services/admin/admin.service';
import { MensajeService } from 'src/app/services/mensajes/mensaje.service';
import { MensajeCompleto } from 'src/app/shared/models/mensajeModel';

@Component({
  selector: 'app-lista-mensajes',
  templateUrl: './lista-mensajes.component.html',
  styleUrls: ['./lista-mensajes.component.scss']
})
export class ListaMensajesComponent implements OnInit {
  listaMensajesReport: MensajeCompleto[] = [];
  listaMensajesBanned: MensajeCompleto[] = [];
  datos = true;
  datos2 = true;
  chatSelected!: MensajeCompleto;
  dialogRef!: MatDialog | undefined;
  displayedColumns = ["id", "mensaje", "activo", "reported", "usuario", "idchat", "fecha", "actions"];
  panelOpenState = false;
  constructor(
    private mensajeService: MensajeService,
    private adminService: AdminService,
    private dialog: MatDialog) {
    this.getAllMensajesReport();
    this.getAllMessageBanned();
  }


  ngOnInit(): void {
  }

  getAllMensajesReport() {
    this.adminService.getMensajesReported().subscribe({
      next: (data) => {
        this.listaMensajesReport = data;
        this.comprobarDatos();
      },
      error: (error) => console.log("No se ha podido obtener los mensajes reportados")
    })
  }

  getAllMessageBanned() {
    this.adminService.getMessageBanned().subscribe({
      next: (data) => {
        this.listaMensajesBanned = data;
        this.comprobarDatos2();
      },
      error: (error) => console.log("No se ha podido obtener los mensajes reportados")
    })
  }

  comprobarDatos() {
    if (this.listaMensajesReport.length > 0) {
      this.datos = true;
    } else {
      this.datos = false;
    }
  }

  comprobarDatos2() {
    if (this.listaMensajesBanned.length > 0) {
      this.datos2 = true;
    } else {
      this.datos2 = false;
    }
  }

  confirmReport(mensaje: MensajeCompleto) {
    if (mensaje.id_mensaje) {
      this.adminService.confirmReport(mensaje.id_mensaje).subscribe({
        next: (data) => {
          if (data) {
            if (this.listaMensajesReport.length > 1) {
              this.listaMensajesReport.splice(this.listaMensajesReport.indexOf(mensaje), 1)
              this.listaMensajesReport = [...this.listaMensajesReport];
            } else {
              this.listaMensajesReport = [];
            }
            mensaje.active = false;
            this.listaMensajesBanned.push(mensaje);
            this.listaMensajesBanned = [...this.listaMensajesBanned];
            this.comprobarDatos();
            this.comprobarDatos2();
          }
        }
      })
    }
  }

  renovalMessage(mensaje: MensajeCompleto) {
    if (mensaje.id_mensaje) {
      this.adminService.renovalMessage(mensaje.id_mensaje).subscribe({
        next: (data) => {
          if (data) {
            if (this.listaMensajesBanned.length > 1) {
              this.listaMensajesBanned.splice(this.listaMensajesBanned.indexOf(mensaje), 1)
              this.listaMensajesBanned = [...this.listaMensajesBanned];
            } else {
              this.listaMensajesBanned = [];
            }
            mensaje.active = true;
            this.listaMensajesReport.push(mensaje);
            this.listaMensajesReport = [...this.listaMensajesReport];
            this.comprobarDatos();
            this.comprobarDatos2();
          }
        }
      })
    }
  }

  whiteMessage(mensaje: MensajeCompleto) {
    if (mensaje.id_mensaje) {
      this.adminService.whiteMessage(mensaje.id_mensaje).subscribe({
        next: (data) => {
          if (data) {
            if (this.listaMensajesReport.length > 1 && this.listaMensajesReport.indexOf(mensaje) != -1) {
              this.listaMensajesReport.splice(this.listaMensajesReport.indexOf(mensaje), 1)
              this.listaMensajesReport = [...this.listaMensajesReport];
            }else if(this.listaMensajesReport.indexOf(mensaje) != -1){
              this.listaMensajesReport = [];
            }

            this.comprobarDatos();
            if (this.listaMensajesBanned.length > 1&& this.listaMensajesBanned.indexOf(mensaje) != -1) {
              this.listaMensajesBanned.splice(this.listaMensajesBanned.indexOf(mensaje), 1)
              this.listaMensajesBanned = [...this.listaMensajesBanned];
            }else if(this.listaMensajesBanned.indexOf(mensaje) != -1){
              this.listaMensajesBanned = [];
            }
            this.comprobarDatos2();
          }
        }
      })
    }
  }
}
