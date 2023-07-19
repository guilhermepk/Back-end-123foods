import { IsNotEmpty } from "class-validator";

export class CreateImageDto {
    @IsNotEmpty()
    path: string;
}
