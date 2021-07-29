import { Injectable } from '@angular/core';

const KEY='token'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  retornatoken(){
    return localStorage.getItem(KEY) ?? ''
  }

  salvatoken(token:string){
    localStorage.setItem(KEY, token)
  }

  excluitoken(){
    localStorage.removeItem(KEY)
  }

  possuitoken(){
    return !!this.retornatoken()
  }
}
