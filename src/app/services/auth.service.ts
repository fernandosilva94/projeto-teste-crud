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

  // login(email: string, password: string): Observable<any> {
  //   const loginData = { email, password };
  //   console.log("verificando login: ", loginData)
  //   return this.http.post<any>(`${this.apiUrl}/authenticate`, loginData)
  //     .pipe(
  //       catchError(ErrorHandlerUtil.handleError)
  //     );
  // }

  async login(email: string, password: string): Promise<any> {
    // const loginData = { email, password };
    // console.log("verificando login: ", loginData);
  
    // try {
    //   const response = await fetch(`${this.apiUrl}/authenticate`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(loginData)
    //   });
  
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
  
    //   return await response.json();
    // } catch (error) {
    //   console.error("Erro ao realizar login:", error);
    //   throw error;
    // }
  //   const loginData = { email, password };
  //   console.log("verificando login: ", loginData); // Verifica o que está sendo enviado

  //   try {
  //     const response = await fetch(`${this.apiUrl}/authenticate`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(loginData)
  //     });

  //     if (!response.ok) {
  //       console.log("RESPONSE NOT OK", response)
  //       throw new Error(`Server-side error: ${response.status} ${response.statusText}`);
  //     }

  //     const responseData = await response.json();
  //     console.log("Verificando responseData", responseData)
  //     return responseData.json();
  //   } catch (error) {
  //     // ErrorHandlerUtil.handleError();
  //     console.log("Errooou!", error)
  //     throw error;
  // }
  const loginData = { email, password };
  console.log("verificando login: ", loginData); // Verifica o que está sendo enviado

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
        console.log("response body: ", responseData)
        const tokenResponse = {token: responseData}
        console.log("response tokenResponse: ", tokenResponse)
        console.log("Apenas o token: ", tokenResponse.token)
        return tokenResponse;
      } catch (error) {
        console.log("Errooou!", error)
        throw error;
      }
    
  }

}
