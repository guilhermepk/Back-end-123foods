import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchases } from './entities/purchases.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchases)
    private purchaseRepository:Repository<Purchases>
  ){}

  async create(createPurchaseDto:CreatePurchaseDto):Promise<Purchases>{
    const purchase = this.purchaseRepository.create(createPurchaseDto);
    return this.purchaseRepository.save(purchase);
  }

  async findAll() {
    return this.purchaseRepository.find();
  }

  async findOne(id:number):Promise<Purchases>{
    return this.purchaseRepository.findOne({where:{id}});
  }

  async update(id:number, updatePurchaseDto:UpdatePurchaseDto): Promise<Purchases> {
    const purchase =await this.purchaseRepository.findOne({where:{id}});
    if (!purchase) {
    throw new NotFoundException('Carrinho não encontrado');
    }
    purchase.user = updatePurchaseDto.user;
    purchase.food = updatePurchaseDto.food;
    purchase.amount = updatePurchaseDto.amount;

  const updatedUser = await this.purchaseRepository.save(purchase);

  return updatedUser;
}

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
