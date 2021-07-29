import { Comentario, Comentarios } from './comentarios';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const api=environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http:HttpClient) { }

  buscacomentario(id:number):Observable<Comentarios>{
    return this.http.get<Comentarios>(`${api}/photos/${id}/comments`)
  }

  incluicomentario(id:number, textocomentario:string):Observable<Comentario>{
    return this.http.post<Comentario>(`${api}/photos/${id}/comments`,{
      textocomentario
    })
  }
}
