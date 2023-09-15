import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app controller';
import { PurchasesModule } from './purchases/purchases.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { BannersModule } from './banners/banners.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AddressModule } from './address/address.module';
import { CategoriesModule } from './categories/categories.module';
import { UnitsOfMeasurementModule } from './units_of_measurement/units_of_measurement.module';


@Module({
  imports: [
    ProductsModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    ProductsModule,
    PurchasesModule,
    ImagesModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          const filename = uniqueSuffix + '.' + extension;
          callback(null, filename);
        },
      }),
    }),
    AuthModule,
    BannersModule,
    NotificationsModule,
    AddressModule,
    CategoriesModule,
    UnitsOfMeasurementModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
