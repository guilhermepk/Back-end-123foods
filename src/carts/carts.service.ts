import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts } from './entities/carts.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Carts)
    private cartRepository:Repository<Carts>
  ){}

  async create(createCartDto:CreateCartDto):Promise<Carts>{
    const cart = this.cartRepository.create(createCartDto);
    return this.cartRepository.save(cart);
  }

  async findAll() {
    return this.cartRepository.find();
  }

  async findOne(id:number):Promise<Carts>{
    return this.cartRepository.findOne({where:{id}});
  }

  async update(id:number, updateCartDto:UpdateCartDto): Promise<Carts> {
    const cart =await this.cartRepository.findOne({where:{id}});
    if (!cart) {
    throw new NotFoundException('Carrinho não encontrado');
    }
     cart.userId = updateCartDto.userId;
     cart.foodIds = updateCartDto.foodIds;


  const updatedUser=await this.cartRepository.save(cart);

  return updatedUser;
}

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
