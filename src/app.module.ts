import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { FoodsModule } from './foods/foods.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app controller';
import { PurchasesModule } from './purchases/purchases.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { FoodsHasImagesModule } from './foods_has_images/foods_has_images.module';

import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    FoodsModule,UsersModule,
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    FoodsModule,
    UsersModule,
    PurchasesModule,
    ImagesModule,
    MulterModule.register({dest:'./upload'}),
    AuthModule,
    FoodsHasImagesModule,

   
  ],
  controllers: [AppController],
  
})
export class AppModule {}
