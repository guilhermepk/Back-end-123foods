import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  IsString,
  Validate,
  IsOptional,
} from 'class-validator';
import { IsAgeValidConstraint } from './is-age-valid.validator';
import { IsCpfValidConstraint } from './is-cpf-valid.validator';
export class CreateUserDto {
  @IsOptional()
  @IsBoolean()
  admin = false;

  @IsNotEmpty()
  name: string;

  @IsDateString()
  @Validate(IsAgeValidConstraint)
  date_of_birth: string;

  @IsString()
  gender: string;

  @Validate(IsCpfValidConstraint)
  @IsString()
  cpf: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'senha muito fraca',
  // })
  password: string;

  //"file"
  image: string;
}
