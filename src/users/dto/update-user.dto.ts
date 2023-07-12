import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    admin?: boolean;
    name?:string;
    gender?:string;
    phone?:string;
    email?:string;
    password?:string;
    city?:string;
    state?:string;
    street?:string;
    cep?:string;
  image?: string;
}