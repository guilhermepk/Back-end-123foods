import { Inject, Injectable, NotFoundException, UsePipes } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from "./entities/users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository:Repository<Users>
  ){}

  async create(createUserDto:CreateUserDto):Promise<Users>{
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll():Promise<Users[]>{
    return this.userRepository.find();
  }
  
  async findOne(id:number):Promise<Users>{
    return this.userRepository.findOne({where:{id}});
  }
  async update(id:number, updateUserDto:UpdateUserDto): Promise<Users> {
    const user =await this.userRepository.findOne({where:{id}});
    if (!user) {
    throw new NotFoundException('Usuario não encontrado');
    }
     user.name=updateUserDto.name;
     user.cpf=updateUserDto.cpf;
     user.phone=updateUserDto.phone;
     user.email=updateUserDto.email;
     user.password=updateUserDto.password;
     user.city=updateUserDto.city;
     user.street=updateUserDto.street;
     user.state=updateUserDto.state;
     user.cep=updateUserDto.cep;


  const updatedUser=await this.userRepository.save(user);

  return updatedUser;
}
  async remove(id:number): Promise<void>{
    const result= await this.userRepository.delete(id);
    if(result.affected===0){
      throw new NotFoundException("Usuário não encontrado");
    }
  }
}