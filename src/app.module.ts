import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { FoodsModule } from './foods/foods.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app controller';
import { AdminsModule } from './admins/admins.module';
import { CartsModule } from './carts/carts.module';
import { ImagesModule } from './images/images.module';
@Module({
  imports: [
    FoodsModule,
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    FoodsModule,
    UsersModule,
    AdminsModule,
    CartsModule,
    ImagesModule,
   
  ],
  controllers: [AppController],
})
export class AppModule {}
