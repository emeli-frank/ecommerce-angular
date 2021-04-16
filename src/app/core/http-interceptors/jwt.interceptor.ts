import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // todo:: set content type to application/json if content type header 
    // was not previously set
    
    if (this.authService.loggedIn) {
      req = req.clone({
          setHeaders: {
            // add authorization token to authorization header if available
            Authorization: `Bearer ${localStorage.getItem(this.authService.storageKeys.token)}`,
          }
      });
    }

    return next.handle(req);
  }
}
