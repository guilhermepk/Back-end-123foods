import {IsBoolean, IsDate, IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, Matches, IsString, Validate} from "class-validator";
import { IsAgeValidConstraint } from './is-age-valid.validator';
import { IsCpfValidConstraint } from './is-cpf-valid.validator';
export class CreateUserDto {
    @IsBoolean()
    admin: boolean = false;

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

    @IsString()
    complement: string;

    @IsString()
    district:string;

    @IsPhoneNumber()
    phone: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: 'senha muito fraca',
    // })
    password: string;

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

   
    image: string;
}