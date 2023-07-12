import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { Users } from 'src/users/entities/users.entity';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
   user?: Users;
}