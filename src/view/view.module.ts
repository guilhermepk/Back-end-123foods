import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { FoodsModule } from 'src/foods/foods.module';
@Module({
    imports:[FoodsModule],
    controllers:[ViewController],
})
export class ViewModule {}



