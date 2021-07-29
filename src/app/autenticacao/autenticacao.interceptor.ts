import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenService.possuitoken()) {
      const token=this.tokenService.retornatoken()
      const headers=new HttpHeaders().append('x-access-token', token)
      request=request.clone({headers})
    }
    return next.handle(request);
  }
}
