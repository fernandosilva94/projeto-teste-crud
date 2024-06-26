import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-teste';

  constructor( private router: Router) {}

  login() {
    console.log("Clicou no login")
    this.router.navigate(['/login']);
  }
}
