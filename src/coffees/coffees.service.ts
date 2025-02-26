import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,

    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: { flavors: true },
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({where: { id: parseInt(id) }, relations: { flavors: true } });
    if (!coffee) throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = createCoffeeDto.flavors && await this.preloadFlavorsByName(createCoffeeDto.flavors);
    const newCoffee = await this.coffeeRepository.create({ ...createCoffeeDto, flavors});
    return this.coffeeRepository.save(newCoffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors && (await this.preloadFlavorsByName(updateCoffeeDto.flavors));
    const  coffee = await this.coffeeRepository.preload({ id: parseInt(id), ...updateCoffeeDto, flavors })
    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);
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
