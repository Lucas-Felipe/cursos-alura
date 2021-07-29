import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovoUsuario } from './novo-usuario';

const api=environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private http:HttpClient) { }

  cadastranovousuario(novoUsuario:NovoUsuario){
    return this.http.post(`${api}/user/signup`,novoUsuario)
  }
  verifica(nomeUsuario:string){
    return this.http.get(`${api}/user/exists/${nomeUsuario}`)
  }
}
