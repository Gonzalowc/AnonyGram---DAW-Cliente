import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.scss']
})
export class UpdateUsuarioComponent implements OnInit {
  updateUsuario!: FormGroup;
  usuarioSelected!: UsuarioCompleto;

  constructor(public dialogRef: MatDialogRef<UpdateUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioCompleto, private fb: FormBuilder, private adminService: AdminService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.usuarioSelected = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.updateUsuario = this.fb.group({
      id: [this.data.id_usuario, Validators.required],
      name: [this.data.name, Validators.required],
      usuario: [this.data.usuario, Validators.required],
      rol: [this.data.rol, Validators.required],
      registro: [this.data.registro, Validators.required],
    })
  }

  updateUsuarioDB() {
    let name = this.updateUsuario.get(["name"])?.value;
    let usuario = this.updateUsuario.get(["usuario"])?.value;
    let rol = this.updateUsuario.get(["rol"])?.value;
    this.usuarioSelected.usuario = usuario != this.usuarioSelected.usuario ? usuario : this.usuarioSelected.usuario;
    this.usuarioSelected.rol = rol != this.usuarioSelected.rol ? rol : this.usuarioSelected.rol;
    this.usuarioSelected.name = name != this.usuarioSelected.name ? name : this.usuarioSelected.name;
    this.adminService.updateUser(this.usuarioSelected).subscribe({
      next: (data) => 
        this.usuarioSelected = data ? this.usuarioSelected : this.data ,
      error: (error) => 
        console.log("No se ha actualizado el usuario")
    });
    this.data = this.usuarioSelected;
  }
}
