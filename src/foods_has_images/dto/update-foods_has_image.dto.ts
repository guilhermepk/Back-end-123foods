import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodsHasImageDto } from './create-foods_has_image.dto';
import { Foods } from 'src/foods/entities/foods.entity';
import { Images } from 'src/images/entities/images.entity';

export class UpdateFoodsHasImageDto extends PartialType(CreateFoodsHasImageDto) {
    food?: Foods;
    image?: Images;
}