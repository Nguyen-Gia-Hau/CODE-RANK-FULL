import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default (): TypeOrmModuleOptions => ({
  type: 'mariadb',
  host: process.env.MARIADB_HOST || 'localhost',
  port: Number(process.env.MARIADB_PORT) || 3306,
  username: process.env.MARIADB_USR || 'root',
  password: process.env.MARIADB_PASS || '@Giahau123',
  database: process.env.MARIADB_DATABASE || 'code_rank_db',
  //synchronize: true,
  autoLoadEntities: true
})
