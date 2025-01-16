import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
export declare class CoffeesService {
    private readonly coffeeRepository;
    constructor(coffeeRepository: Repository<Coffee>);
    findAll(paginationQuery: any): Promise<Coffee[]>;
    findOne(id: string): Promise<Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    delete(id: string): Promise<Coffee>;
}
