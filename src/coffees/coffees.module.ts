import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';

@Module({
	controllers: [CoffeesController],
	providers: [CoffeesService],
	imports: [TypeOrmModule.forFeature([Coffee])]
})
export class CoffeesModule {}
