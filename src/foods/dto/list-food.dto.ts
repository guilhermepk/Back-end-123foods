export class ListaFoodDTO {
    constructor(
      readonly id: string,
      readonly name: string,
      readonly brand: string,
      readonly weight: number,
      readonly unit_of_measurement: string,
      readonly category: string,
      readonly qtd: number,
      readonly description: string,
      readonly price: number
    ) {}
  }