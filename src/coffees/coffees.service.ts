import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(@Query() paginationQuery) {
    return this.coffeeRepository.find()
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({where: { id: +id }});
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const newCoffee = await this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(newCoffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const  coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto
    })
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async delete(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ where: { name }});
    if (existingFlavor) return existingFlavor;
    return this.flavorRepository.create({ name });
  }

  private preloadFlavorsByName(flavors: string[]): Promise<Flavor[]> {
    return Promise.all(flavors.map(name => this.preloadFlavorByName(name)));
  }
}
