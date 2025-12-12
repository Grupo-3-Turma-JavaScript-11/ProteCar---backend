import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true,
                usuario: true

            }
        });
    }

    async findById(id: number): Promise<Produto> {
        let busca = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true,
                usuario: true
            }
        })

        if (!busca) {
            throw new Error()
        }
        return busca
    }

    async findByNumeroApolice(numeroApolice: string): Promise<Produto | null> {
        return await this.produtoRepository.findOne({
            where: {
                numeroApolice : ILike(`%${numeroApolice}%`)
            },
            relations: {
                categoria: true,
                usuario: true
            }
        })
    }


    async create(produto: Produto): Promise<Produto> {
        // Ano atual
        const anoAtual = new Date().getFullYear();

        // Verifica se o carro tem mais de 10 anos
        const idadeCarro = anoAtual - produto.anoCarro;

        if (idadeCarro > 10) {
            // Aplica 20% de desconto
            produto.valor = produto.valor * 0.8; // 20% OFF
        }
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        let produtoUpdate: Produto = await this.findById(produto.id)
        let produtoBusca = await this.findByNumeroApolice(produto.numeroApolice)

        if (!produtoUpdate) {
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        if (produtoBusca && produtoBusca.id !== produto.id) {
            throw new HttpException("Produto já Cadastrado, digite outro!", HttpStatus.BAD_REQUEST);
        }
        return await this.produtoRepository.save(produto);
        }

        async delete(id: number): Promise<DeleteResult> {
        let produtoBusca = await this.findById(id)

        if(!produtoBusca){
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }
        return this.produtoRepository.delete(id)
        
        }
        

}