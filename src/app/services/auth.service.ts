import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ErrorHandlerUtil } from '../utils/error-handler.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  async login(email: string, password: string): Promise<any> {
  const loginData = { email, password };

      try {
        const response = await fetch(`${this.apiUrl}/authenticate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });

        if (!response.ok) {
          throw new Error(`Server-side error: ${response.status} ${response.statusText}`);
        }

        const responseData = response.text();
        const tokenResponse = {token: responseData}
        return tokenResponse;
      } catch (error) {
        console.log("Error: ", error)
        throw error;
      }
  }

  getUserEmailFromToken(): string {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }

  logout() {
    localStorage.removeItem('authToken');
  }

}
