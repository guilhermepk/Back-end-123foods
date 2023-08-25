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
  isNumber,
  IsOptional
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  userId: number;
  @IsOptional()
  @IsString()
  complement: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  state: string;

  @IsString()
  cep: string;

  @IsString()
  numberhouse: string;
}
