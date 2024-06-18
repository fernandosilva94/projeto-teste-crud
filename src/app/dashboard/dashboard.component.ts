import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userName: string = '';
  cards = [
    { title: 'Card 1', text: 'Informações adicionais sobre este card.' },
    { title: 'Card 2', text: 'Informações adicionais sobre este card.' },
    { title: 'Card 3', text: 'Informações adicionais sobre este card.' }
  ];
  constructor(private router: Router, 
              private authService: AuthService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserName();
  }

  login() {
    console.log("Clicou no login")
    this.router.navigate(['/login']);
  }

  cadastro() {
    this.router.navigate(['cadastro']);
  }

  async fetchUserName() {
    try {
      const email =  this.authService.getUserEmailFromToken();
      const user = await this.userService.getUserByEmail(email);
      console.log("verificando instancia: ", user)
      this.userName = user.nome;
    } catch(error) {

    }
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
