import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
export class CreateNotificationDto {
    @IsNotEmpty()
    title:string

    @IsOptional()
    @IsNotEmpty()
    link:string
    
    @IsNotEmpty()
    message:string





}
