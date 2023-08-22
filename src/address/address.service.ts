import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  findById(id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  async findAll(userId: number): Promise<Address[]> {
    return this.addressRepository.find({ where: { userId } });
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
