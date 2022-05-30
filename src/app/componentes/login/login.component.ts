import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';
import { saveData } from '../chat/chat.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  clicked:boolean = false;
  usuario!: string;
  password!: string;
  usuarioSolicitud!:UsuarioCompleto;
  loginForm!: FormGroup;
  usuarioRespuesta: any;
  constructor(private userService: UsuarioService, private fb: FormBuilder, private router: Router) {
    this.createForm(fb);
  }
  createForm(fb:FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }
  ngOnInit(): void {
  }

  login() {
    if (!this.loginForm.pristine && !this.loginForm.invalid) {
      this.usuario = this.loginForm.get(["usuario"])?.value;
      this.password = this.loginForm.get("password")?.value;

      this.userService.loginUser({ "usuario": this.usuario, "password": this.password })
        .subscribe({
          next: (data) => {
            if (data) {
              this.usuarioRespuesta = data;
              saveData("sesion", JSON.stringify(this.usuarioRespuesta));
              console.log(this.usuarioRespuesta);
              this.router.navigate(['/chat']);
            }
          }, error: (error) => {
            console.log("No se ha podido logear el usuario");
          }
        });



        /*.subscribe(
           (data) => {
         
        }, 
        (error) => {
          console.log("No se ha podido logear el usuario");
        }
        );    */
    }
    
  }

  setMessageErrorOn(state:boolean){
    this.clicked = state;
  }

}
