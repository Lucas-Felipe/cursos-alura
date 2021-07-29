import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import jwt_decode from 'jwt-decode'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosubject=new BehaviorSubject<Usuario>({})

  constructor(private tokenservice:TokenService) {
    if (this.tokenservice.possuitoken()) {
      this.decodifica()
    }
   }

  private decodifica(){
    const token=this.tokenservice.retornatoken()
    const usuario = jwt_decode(token)as Usuario
    this.usuariosubject.next(usuario)
  }

  retornausuario(){
    return this.usuariosubject.asObservable()
  }

  salvartoken(token:string){
    this.tokenservice.salvatoken(token)
    this.decodifica()
  }

  logout(){
    this.tokenservice.excluitoken()
    this.usuariosubject.next({})
  }
  estalogado(){
    return this.tokenservice.possuitoken()
  }
}
