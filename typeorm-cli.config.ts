import { Coffee } from "src/coffees/entities/coffee.entity";
import { Flavor } from "src/coffees/entities/flavor.entity";
import { SchemaSync1740607863777 } from "src/migrations/1740607863777-SchemaSync";
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 1234,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [SchemaSync1740607863777],
});
