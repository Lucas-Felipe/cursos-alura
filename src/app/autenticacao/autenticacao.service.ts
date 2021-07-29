import { environment } from './../../environments/environment.prod';
import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http'
import { tap } from 'rxjs/operators';

const api=environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private httpClient:HttpClient,private usuarioservice:UsuarioService) { }

  autenticar(usuario:string,senha:string):Observable<HttpResponse<any>>{
    return this.httpClient.post(`${api}/user/login`,{
      userName:usuario,password:senha
    },{observe:'response'}
    ).pipe(
      tap((res)=>{
        const authtoken=res.headers.get('x-access-token') ?? ''
        this.usuarioservice.salvartoken(authtoken)
      })
    )
  }
}
