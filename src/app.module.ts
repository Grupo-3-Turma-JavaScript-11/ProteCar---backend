import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_protecar',
      entities: [Produto,Usuario],
      synchronize: true,
      logging: true,
    }),
    ProdutoModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}