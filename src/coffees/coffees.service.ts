import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeesService {
	constructor(
		@InjectRepository(Coffee)
		private readonly coffeesRepository: Repository<Coffee>
	) {}
	findAll() {
		return this.coffeesRepository.find();
	}

	async findOne(id: string) {
		const coffees = await this.findOne(id);

		// const coffee = coffees.find((item) => item.id === +id);
		if (!coffees) {
			throw new NotFoundException(`Coffee #${id} not found`);
		}

		return coffees;
	}

	create(createCoffeeDto) {
		const coffee = this.coffeesRepository.create(createCoffeeDto);
		return this.coffeesRepository.save(coffee);
	}

	async update(id, updateCoffee) {
		const existingCoffee = await this.coffeesRepository.preload({
			id: +id,
			...updateCoffee
		});

		if (!existingCoffee) {
			throw new NotFoundException(`Coffee #${id} not found`);
		}
		return this.coffeesRepository.save(existingCoffee);
	}

	async delete(id) {
		const coffeeIndex = await this.findOne(id);
		return this.coffeesRepository.remove(coffeeIndex);
	}
}
