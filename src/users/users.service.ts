import { Inject, Injectable, NotFoundException, UsePipes } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from "./entities/users.entity";
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository:Repository<Users>
  ){}

  async create(createUserDto:CreateUserDto):Promise<Users>{
    const user = this.userRepository.create(createUserDto);
    user.password=bcrypt.hashSync(createUserDto.password,8)
    return this.userRepository.save(user);
  }
  // async login(email:string,password:string):Promise<Users[]>{


  // }

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
    user
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
findByEmail(email: string) {
  return this.userRepository.findOne({ where: { email } });
}
  async remove(id:number): Promise<void>{
    const result= await this.userRepository.delete(id);
    if(result.affected===0){
      throw new NotFoundException("Usuário não encontrado");
    }
  }
  async findOne(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}