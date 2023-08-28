import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { Token } from './token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
