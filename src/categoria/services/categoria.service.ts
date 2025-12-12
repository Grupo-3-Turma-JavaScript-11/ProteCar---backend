import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async criar(descricao: string): Promise<Categoria> {
    const categoria = new Categoria();
    categoria.descricao = descricao;
    return await this.categoriaRepository.save(categoria);
  }

  async listarTodos(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      order: { id: 'ASC' },
      relations:{
        produto: true
      }
    });
  }

  async buscarPorId(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { 
        id 
      },
      relations: {
        produto: true
      }
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }

  async buscarPorDescricao(descricao: string): Promise<Categoria | null> {
    return await this.categoriaRepository.findOne({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        produto: true
      }
    });
  }

  async atualizar(categoria: Categoria): Promise<Categoria> {
    let categoriaUpdate: Categoria = await this.buscarPorId(categoria.id)
    let categoriaBusca = await this.buscarPorDescricao(categoria.descricao)
  
    if (!categoriaUpdate) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }
  
    return await this.categoriaRepository.save(categoria);
  }

  async excluir(id: number): Promise<void> {
    const categoria = await this.buscarPorId(id);
    await this.categoriaRepository.remove(categoria);
  }
}
