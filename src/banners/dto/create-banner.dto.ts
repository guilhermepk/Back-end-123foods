import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
export class CreateBannerDto {

    image:string
    @IsString()
    alt:string
    @IsString()
    link:string
}