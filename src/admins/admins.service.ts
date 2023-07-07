import { Inject, Injectable, NotFoundException, UsePipes } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admins } from "./entities/admins.entity";

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins)
    private adminRepository:Repository<Admins>,
  ){}

  async create(createAdminDto:CreateAdminDto):Promise<Admins>{
    const user = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(user);
  }

  async findAll():Promise<Admins[]>{
    return this.adminRepository.find();
  }
  
  async findOne(id:number):Promise<Admins>{
    return this.adminRepository.findOne({where:{id}});
  }
  async update(id:number, updateAdminDto:UpdateAdminDto): Promise<Admins> {
    const admin =await this.adminRepository.findOne({where:{id}});
    if (!admin) {
    throw new NotFoundException('Administrador não encontrado');
    }
     admin.name=updateAdminDto.name;
     admin.phone=updateAdminDto.phone;
     admin.email=updateAdminDto.email;
     admin.password=updateAdminDto.password;


  const updatedAdmin=await this.adminRepository.save(admin);

  return updatedAdmin;
}
  async remove(id:number): Promise<void>{
    const result= await this.adminRepository.delete(id);
    if(result.affected===0){
      throw new NotFoundException("Usuário não encontrado");
    }
  }
}