import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm?: FormGroup | undefined;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    });
  
  }

  onSubmit() {
    console.log("entrou no onSubmit")
    if (this.cadastroForm?.valid) {
      console.log("entrou no if")
      const user: User = {
        nome: this.cadastroForm.value.nome,
        email: this.cadastroForm.value.email,
        cpf: this.cadastroForm.value.cpf,
        password: this.cadastroForm.value.senha
      };
      this.userService.addUser(user).pipe(
        tap(() => {alert("usuario salvo com sucesso")}),
        catchError((error) => {console.log("Erro ao salvar: "+ error.message);
          return throwError(() => new Error(error));
        })
      ).subscribe();
    }
  }
  // onSubmit() {
  //   console.log("entrou no onSubmit")
  //   if (this.cadastroForm?.valid) {
  //     console.log("entrou no if")
  //     const user: User = {
  //       nome: this.cadastroForm.value.nome,
  //       email: this.cadastroForm.value.email,
  //       cpf: this.cadastroForm.value.cpf,
  //       senha: this.cadastroForm.value.senha
  //     };
  //     this.userService.addUser(user).subscribe(
  //       () => {
  //         alert("Usuário salvo com sucesso!");
  //       },
  //       (error) => {
  //         console.log("Erro ao salvar: " + error.message);
  //         alert("Erro ao salvar o usuário. Por favor, tente novamente.");
  //       }
  //     );
  //   }
  // }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/login'])
  }
}
