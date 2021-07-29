import { environment } from './../../environments/environment.prod';
import { TokenService } from './../autenticacao/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Animais, Animal } from './animais';
import { catchError, mapTo } from 'rxjs/operators';

const api = environment.apiURL;
const NOT_MODIFIED='304'

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private TokenService: TokenService) {}

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${api}/${nomeDoUsuario}/photos`);
  }
  buscaporid(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${api}/photos/${id}`);
  }

  excluianimal(id:number):Observable<Animal>{
    return this.http.delete<Animal>(`${api}/photos/${id}`)
  }

  curtir(id:number):Observable<boolean>{
    return this.http.post(`${api}/photos/${id}/like`,{},{observe:'response'}).pipe(
      mapTo(true), catchError((error)=>{
        return error.status === NOT_MODIFIED ? of(false):throwError(error)
      })
    )
  }

  upload(descricao:string,permitecomentario:boolean,arquivo:File){
    const formdata=new FormData()
    formdata.append('description',descricao)
    formdata.append('allowcoments',permitecomentario ? 'true':'false')
    formdata.append('imageFile',arquivo)

    return this.http.post(`${api}/photos/upload`,formdata,{observe:'events',reportProgress:true})
  }
}
