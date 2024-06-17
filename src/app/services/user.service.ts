import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/add', user).pipe(
      catchError((error) => {
        console.error('Erro ao salvar usuário:', error);
        throw error;
      })
    );
  }

  async getUserById(id: string): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return await firstValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`));
  }

  async getUserByEmail(email: string): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return await firstValueFrom(
      this.http.get<any>(`${this.apiUrl}/email/${email}`, { headers })
    );
  }
}
