import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class ErrorHandlerUtil {
  static handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
