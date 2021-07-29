import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculo } from './minusculo.validator';
import { usuarioSenhaIguais } from './usuario-senha-iguais.validator';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!:FormGroup

  constructor(private formBuilder:FormBuilder,
    private NovoUsuarioService:NovoUsuarioService,
    private usuarioexistenteservice:UsuarioExisteService,
    private router:Router) { }

  ngOnInit(): void {
    this.novoUsuarioForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      fullName:['',[Validators.required,Validators.minLength(4)]],
      userName:['',[minusculo],[this.usuarioexistenteservice.usuarioExiste()]],
      password:['']
    },{
      validators:[usuarioSenhaIguais]
    })

  }
  cadastrar(){
    if (this.novoUsuarioForm.valid) {
      const novoUsuario=this.novoUsuarioForm.getRawValue() as NovoUsuario
      this.NovoUsuarioService.cadastranovousuario(novoUsuario).subscribe(()=>{
        this.router.navigate([''])
      },
      (error)=>{
        console.log(error)
      }
      )
    }

}
}
