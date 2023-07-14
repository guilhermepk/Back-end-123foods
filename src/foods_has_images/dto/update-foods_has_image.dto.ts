import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodsHasImageDto } from './create-foods_has_image.dto';

export class UpdateFoodsHasImageDto extends PartialType(CreateFoodsHasImageDto) {}