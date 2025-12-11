import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categiria/categoria.module';
import { Categoria } from './categiria/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'GabGouIngriGab0307@',
      database: 'db_protecar',
      entities: [Produto,Usuario, Categoria],
      synchronize: true,
      logging: true,
    }),
    ProdutoModule,
    UsuarioModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}