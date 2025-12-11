import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categiria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'generetion',
      password: '123',
      database: 'db_blogpessoal',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
  ],
})
export class AppModule {}
