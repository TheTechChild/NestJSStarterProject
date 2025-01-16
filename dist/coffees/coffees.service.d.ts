import { Coffee } from './entities/coffee.entity';
export declare class CoffeesService {
    private coffees;
    findOne(id: string): Coffee;
    findAll(paginationQuery: any): Coffee[];
    create(createCoffeeDto: any): any;
    update(id: string, updateCoffeeDto: any): void;
    delete(id: string): void;
}
