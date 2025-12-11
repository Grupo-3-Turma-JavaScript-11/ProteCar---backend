import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Usuarioservice } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { DeleteResult } from "typeorm";

@Controller("/usuarios")
export class UsuarioController {

    constructor(private readonly usuarioService: Usuarioservice) { }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.findById(id)
    }

    @Get('/email/:email')
    @HttpCode(HttpStatus.OK)
    findByEmail(@Param('email') email: string): Promise<Usuario | null> {
        return this.usuarioService.findByEmail(email)
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario)
    }

    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult>{
        return this.usuarioService.delete(id)
    }


}