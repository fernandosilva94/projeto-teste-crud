import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  login() {
    console.log("Clicou no login")
    this.router.navigate(['/login']);
  }

  cadastro() {
    this.router.navigate(['cadastro']);
  }
}
