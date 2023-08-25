import {forwardRef, Module} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
@Module({
  imports: [TypeOrmModule.forFeature([Address]),
  forwardRef(()=>AuthModule)],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
