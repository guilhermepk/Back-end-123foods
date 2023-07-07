export class ListaAdminDTO {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly phone:number,
        readonly email:string,
        readonly password:string
    ) {}
}