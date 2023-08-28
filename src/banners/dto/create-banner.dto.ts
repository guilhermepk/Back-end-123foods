import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
export class CreateBannerDto {
  image: string;

  @IsString()
  alt: string;

  @IsOptional()
  @IsString()
  link: string;
}
