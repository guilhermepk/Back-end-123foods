import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
export class CreateNotificationDto {
    @IsNotEmpty()
    title:string
    @IsNotEmpty()
    link:string
    @IsNotEmpty()
    message:string





}
