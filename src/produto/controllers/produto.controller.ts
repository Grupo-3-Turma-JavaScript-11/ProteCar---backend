import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { DeleteResult } from "typeorm";

@Controller("/produtos")
export class ProdutoController{
    constructor(private readonly produtoService: ProdutoService) {}

        @Get()
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<Produto[]> {
            return this.produtoService.findAll();
        }

        @Get('/:id')
        @HttpCode(HttpStatus.OK)
        findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
            return this.produtoService.findById(id)
        }
    
        @Get('/apolice/:numeroApolice')
        @HttpCode(HttpStatus.OK)
        fyndByNumeroApolice(@Param('numeroApolice') numeroApolice: string): Promise<Produto | null> {
            return this.produtoService.findByNumeroApolice(numeroApolice)
        }
    
        @Post('/cadastrar')
        @HttpCode(HttpStatus.CREATED)
        create(@Body() usuario: Produto): Promise<Produto> {
            return this.produtoService.create(usuario)
        }
    
        @Put('/atualizar')
        @HttpCode(HttpStatus.OK)
        update(@Body() usuario: Produto): Promise<Produto> {
            return this.produtoService.update(usuario)
        }
    
        @Delete('/deletar/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult>{
            return this.produtoService.delete(id)
        }
}