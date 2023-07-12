import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Users } from "src/users/entities/users.entity";

export class CreateAdminDto {
    user: Users;
}