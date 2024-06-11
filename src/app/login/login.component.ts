import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.senha,
      };

      try {
         const response = await this.authService.login(
          loginData.email,
          loginData.password
        );
        const responseToken = await response.token;
        console.log("verificando token: ", responseToken)

        localStorage.setItem('authToken', responseToken);

        alert('Login realizado com sucesso')
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Erro ao realizar login: ', error);
        alert('Erro ao realizar login');
      }
    }
  }

  cadastrar() {
    this.router.navigate(['/cadastro']);
  }

}
