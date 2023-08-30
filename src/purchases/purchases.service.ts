import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchases } from './entities/purchases.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Images} from 'src/images/entities/images.entity';
import { Users } from 'src/users/entities/users.entity';
import { Foods } from 'src/foods/entities/foods.entity';
import { privateEncrypt } from 'crypto';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchases)
    private purchaseRepository: Repository<Purchases>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
    @InjectRepository(Foods)
    private foodRepository: Repository<Foods>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchases> {
    const idPurchase = await this.purchaseRepository.findOne({
      relations: { image: true, user: true, food:true },
      where: {
    
        food:{id: createPurchaseDto.foodId },
        image: { id: createPurchaseDto.imageId },
        user: { id: createPurchaseDto.userId },
      },
    });
    console.log(idPurchase);
    if (idPurchase) throw new NotAcceptableException('uma mensagem bunitinha');

    const image = await this.imageRepository.findOne({
      where: { id: createPurchaseDto.imageId },
    });
    if (!image) throw new NotFoundException('Não encontrado image');

    const user = await this.userRepository.findOne({
      where: { id: createPurchaseDto.userId },
    });
    if (!user) throw new NotFoundException('Não encontrado user');
    const food = await this.foodRepository.findOne({
      where: { id: createPurchaseDto.foodId },
    });
    if (!food) throw new NotFoundException('Não encontrado food');

    const newPurchase = new Purchases();
    newPurchase.image = image;
    newPurchase.food = food;
    newPurchase.user = user;
    newPurchase.amount = createPurchaseDto.amount; 
    newPurchase.status = createPurchaseDto.status;

    return this.purchaseRepository.save(newPurchase);
  }

  async findbuypurchase(userId: number, status:string): Promise<Purchases[]> {
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.user.id = :userId', { userId }) 
      .andWhere('purchase.status = :status', { status: status }) 
      .leftJoinAndSelect('purchase.image', 'image')
      .leftJoinAndSelect('purchase.user', 'user')
      .getMany();
  }
  
  async findAllByUserId(userId: number): Promise<Purchases[]> {
    return this.purchaseRepository.find({
      where: { user: { id: userId } },
      relations: ['image','user'],
      
    });
  }
  

  async findOne(id: number): Promise<Purchases> {
    return this.purchaseRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchases> {
    const purchase = await this.purchaseRepository.findOne({ where: { id } });
    if (!purchase) {
      throw new NotFoundException('Carrinho não encontrado');
    }
    purchase.status=updatePurchaseDto.status;
    purchase.amount = updatePurchaseDto.amount;

    const updatedUser = await this.purchaseRepository.save(purchase);

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const result = await this.purchaseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('images_has_image not found');
    }
  }
}
