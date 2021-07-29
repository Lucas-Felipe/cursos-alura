export interface Animal {
  id:number
  postDate:Date
  url:string
  description:string
  allowcoments:boolean
  likes:number
  comments:number
  userId:number
}

export type Animais=Animal[]
