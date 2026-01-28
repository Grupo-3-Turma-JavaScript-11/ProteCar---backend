import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
TypeOrmModule.forRootAsync({
	useClass: ProdService,
    imports: [ConfigModule],
}),
    ProdutoModule,
    UsuarioModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}