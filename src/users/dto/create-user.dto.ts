import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsBoolean()
    admin: boolean = false;

    @IsNotEmpty()
    name: string;

    @IsString()
    date_of_birth: string;
    
    @IsString()
    gender: string;

    @IsString()
    cpf: string;

    @IsPhoneNumber()
    phone: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsString()
    city: string;

    @IsString()
    street: string;

    @IsString()
    state: string;

    @IsString()
    cep: string;
<<<<<<< HEAD

    @IsString()
    numberhouse: string;
=======
>>>>>>> parent of a3d4fcb (Merge branch 'main' into criando-envio-de-imagens-nos-produtos)

    @IsNotEmpty()
    image: string;
}