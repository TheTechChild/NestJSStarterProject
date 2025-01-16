import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(paginationQuery: any): Promise<import("./entities/coffee.entity").Coffee[]>;
    findOne(id: number): Promise<import("./entities/coffee.entity").Coffee>;
    create(createCoffeeDTO: CreateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    remove(id: string): Promise<import("./entities/coffee.entity").Coffee>;
}
