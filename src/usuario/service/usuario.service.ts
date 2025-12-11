import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class Usuarioservice{

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ){}

    async findAll(): Promise<Usuario[]>{
        return await this.usuarioRepository.find({
            relations: {
                produto: true
            }
        })
    }

    async findById(id: number): Promise<Usuario>{
        let busca = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        })

        if(!busca){
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)
    }
         return busca
    }

    async findByEmail(email: string): Promise<Usuario>{
        let busca = await this.usuarioRepository.findOne({
            where: {
                email
            },
            relations: {
                produto: true
            }
        })
        if(!busca){
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)
    }
        return busca
    }

    async create(usuario: Usuario): Promise<Usuario>{
        let usuarioBusca = await this.findByEmail(usuario.email)

        if(!usuarioBusca){
            return await this.usuarioRepository.save(usuario)
        }
        throw new HttpException("O Usuário ja existe!", HttpStatus.BAD_REQUEST);
    }

    async update(usuario: Usuario): Promise<Usuario>{
        let usuarioUpdate: Usuario = await this.findById(usuario.id)
        let usuarioBusca = await this.findByEmail(usuario.email) 

        if (!usuarioUpdate){
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }

        if (usuarioBusca && usuarioBusca.id !== usuario.id){
            throw new HttpException('Usuário (e-mail) já Cadastrado, digite outro!', HttpStatus.BAD_REQUEST);
        }
        return await this.usuarioRepository.save(usuario);

    }
    
    async delete(id: number): Promise<DeleteResult>{
        let usuarioBusca = await this.findById(id)

        if(!usuarioBusca){
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }
        return await this.usuarioRepository.delete(id)
    }

}