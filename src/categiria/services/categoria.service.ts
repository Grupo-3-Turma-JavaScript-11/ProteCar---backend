import { Injectable, NotFoundException } from '@nestjs/common';
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
    });
  }

  async buscarPorId(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }

  async buscarPorDescricao(descricao: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
    });
  }

  async atualizar(id: number, descricao: string): Promise<Categoria> {
    const categoria = await this.buscarPorId(id);
    categoria.descricao = descricao;
    return await this.categoriaRepository.save(categoria);
  }

  async excluir(id: number): Promise<void> {
    const categoria = await this.buscarPorId(id);
    await this.categoriaRepository.remove(categoria);
  }
}
