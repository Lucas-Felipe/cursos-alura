import { AnimaisService } from './../animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../animais';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  animalid!: number;
  animal$!: Observable<Animal>;

  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.animalid = this.activatedRoute.snapshot.params.animalid;
    this.animal$ = this.animaisService.buscaporid(this.animalid);
  }

  curtir(){
    this.animaisService.curtir(this.animalid).subscribe((curtida)=>{
      if (curtida) {
        this.animal$=this.animaisService.buscaporid(this.animalid)
      }
    })
  }

  excluir(){
    this.animaisService.excluianimal(this.animalid).subscribe(()=>{
      this.router.navigate(['/animais/'])
    },(error)=>console.log(error))
  }
}
