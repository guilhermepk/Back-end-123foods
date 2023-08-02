import { Inject, Injectable, NotFoundException, UsePipes } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from "./entities/users.entity";
import * as bcrypt from 'bcrypt';
import * as fs from 'fs-extra';
@Injectable()
export class UsersService {
  findById(id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Users)
    private userRepository:Repository<Users>
  ){}

  async create(createUserDto:CreateUserDto):Promise<Users>{
    const user = this.userRepository.create(createUserDto);
    user.password=bcrypt.hashSync(createUserDto.password,8)
    return this.userRepository.save(user);
  }

  async findAll():Promise<Users[]>{
    return this.userRepository.find();
  }
  
  async findOneById(id:number):Promise<Users>{
    return this.userRepository.findOne({where:{id}});
  }
  async update(id:number, updateUserDto:UpdateUserDto): Promise<Users> {
    const user =await this.userRepository.findOne({where:{id}});
    if (!user) {
    throw new NotFoundException('Usuario não encontrado');
    }
    user.admin=updateUserDto.admin; 
    user.name=updateUserDto.name;
    user.image = updateUserDto.image;
    user.cpf=updateUserDto.cpf;
    user.phone=updateUserDto.phone;
    user.email=updateUserDto.email;
    user.password=bcrypt.hashSync(updateUserDto.password,8);
    user.city=updateUserDto.city;
    user.street=updateUserDto.street;
    user.state=updateUserDto.state;
    user.cep=updateUserDto.cep;


  const updatedUser=await this.userRepository.save(user);

  return updatedUser;
}
async updateimage(id:number, updateUserDto:UpdateUserDto): Promise<Users> {
  const user =await this.userRepository.findOne({where:{id}});
  if (!user) {
  throw new NotFoundException('Usuario não encontrado');
  }
  
  user.image = updateUserDto.image;
const updatedUser=await this.userRepository.save(user);

return updatedUser;
}
findByEmail(email: string) {
  return this.userRepository.findOne({ where: { email } });
}
async remove(id: number): Promise<void> {
  const user = await this.userRepository.findOne({where:{id}});
  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (user.image) {
    const imagePath = './uploads/' + user.image;
    await fs.unlink(imagePath);
    console.log('Image deleted');
  }

  const result = await this.userRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException('User not found');
  }
}

  async findOne(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}