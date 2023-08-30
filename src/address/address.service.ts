import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const idAddress =await this.addressRepository.findOne({
      relations: {  user: true},
      where: {
        user: { id: createAddressDto.userId },
      },

    });
    if (idAddress) throw new NotAcceptableException('uma mensagem bunitinha');
    const user = await this.userRepository.findOne({
      where: { id: createAddressDto.userId },
    });
    if (!user) throw new NotFoundException('Não encontrado user');
    const newAddress= new Address();
    newAddress.user=user;
    newAddress.cep=createAddressDto.cep;
    newAddress.city=createAddressDto.city;
    newAddress.complement=createAddressDto.complement;
    newAddress.numberhouse=createAddressDto.numberhouse;
    newAddress.state=createAddressDto.state;
    newAddress.street=createAddressDto.street;
    newAddress.district=createAddressDto.district;
    return this.addressRepository.save(newAddress);
  }

  async findAll(userId: number): Promise<Address[]> {
    return this.addressRepository.find({ where: { user: { id: userId }} });
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
    address.complement = updateAddressDto.complement;
    address.city = updateAddressDto.city;
    address.street = updateAddressDto.street;
    address.state = updateAddressDto.state;
    address.district = updateAddressDto.district;
    address.cep = updateAddressDto.cep;
    const updatedAddress = await this.addressRepository.save(address);

    return updatedAddress;
  }

  async remove(id: number): Promise<void> {
    const address = await this.addressRepository.findOne({ where: { id } });
    const result = await this.addressRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Address not found');
    }
  }
}
