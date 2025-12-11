// src/categoria/controllers/categoria.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  criar(@Body() body: { descricao: string }) {
    return this.categoriaService.criar(body.descricao);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  listarTodos() {
    return this.categoriaService.listarTodos();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.buscarPorId(id);
  }

  @Get('buscar/:descricao')
  @HttpCode(HttpStatus.OK)
  buscarPorDescricao(@Param('descricao') descricao: string) {
    return this.categoriaService.buscarPorDescricao(descricao);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { descricao: string },
  ) {
    return this.categoriaService.atualizar(id, body.descricao);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  excluir(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.excluir(id);
  }
}
