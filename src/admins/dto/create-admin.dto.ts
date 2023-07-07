import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}