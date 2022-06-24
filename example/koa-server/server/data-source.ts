import { DataSource } from "typeorm";
import Menu from './entity/Menu'
import User from './entity/Auth'

export const AppDataSource = new DataSource({
  "type": "mysql",
  "host": "114.55.234.157",
  "port": 3306,
  "username": "root",
  "password": "qwe13461838285",
  "database": "how_to_live_longer",
  "synchronize": true,
  "logging": false,
  "entities": [Menu, User],
})

