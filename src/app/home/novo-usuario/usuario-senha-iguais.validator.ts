import { FormGroup } from '@angular/forms';
export function usuarioSenhaIguais(FormGroup:FormGroup){
  const username= FormGroup.get('userName')?.value ?? ''
  const senha=FormGroup.get('password')?.value ?? ''

  if (username.trim()+senha.trim()) {
    return username!==senha ? null:{senhaIgualUsuario:true}
  } else {
    return null
  }

}
