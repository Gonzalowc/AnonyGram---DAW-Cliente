import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';
import { saveData } from '../chat/chat.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  usuario!:string;
  name!:string;
  password!:string;
  usuarioSolicitud!:UsuarioCompleto;
  usuarioRespuesta!:UsuarioCompleto;

  constructor(private userService: UsuarioService, private fb: FormBuilder, private router:Router) {
    this.createForm(fb);
  }
  createForm(fb:FormBuilder) {
    this.registerForm = this.fb.group({
      usuario: ['', Validators.required ],
      name: ['', Validators.required],
      password: ['', Validators.required ],
    });
  }
  ngOnInit(): void {
  }

  register() {
    this.usuario = this.registerForm.get(["usuario"])?.value;
    this.name = this.registerForm.get(["name"])?.value;
    this.password = this.registerForm.get("password")?.value;

    this.userService.registerUser({ "usuario": this.usuario, "name": this.name, "password": this.password })
      .subscribe({
        next: (data) => {
          console.log("Subscribe: > " + data)
          if (data != null) {
            this.router.navigate(['/login']);
          }
        }, error: (error) => {
          console.log("No se ha podido registrar el usuario");
        }
      })
  }

}