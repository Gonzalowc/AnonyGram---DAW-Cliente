import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UsuarioCompleto } from 'src/app/shared/models/usuarioModel';
import { saveData } from '../chat/chat.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  clicked: boolean = false;
  usuario!: string;
  password!: string;
  error!: string;
  usuarioSolicitud!: UsuarioCompleto;
  loginForm!: FormGroup;
  usuarioRespuesta: any;
  constructor(private userService: UsuarioService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.createForm(fb);
  }
  createForm(fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params['error']) {
          this.error = params['error'];
        }
        console.log(this.error);
      }
      );
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
            }
            this.router.navigate(['/redirect']);
          }, error: (error) => {
            console.log("No se ha podido logear el usuario");
          }
        });
    }

  }

  setMessageErrorOn(state: boolean) {
    this.clicked = state;
  }

}
