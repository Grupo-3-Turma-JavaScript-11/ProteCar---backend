import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'generetion',
      password: '123',
      database: 'db_procar',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
  ],
})
export class AppModule {}
