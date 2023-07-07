export class ListaUserDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly gender:string,
    readonly phone:number,
    readonly email:string,
    readonly password:string,
    readonly city:string,
    readonly street:string,
    readonly cep:string,
    readonly date_of_birth:Date,
    readonly cpf:string
  ) {}
}