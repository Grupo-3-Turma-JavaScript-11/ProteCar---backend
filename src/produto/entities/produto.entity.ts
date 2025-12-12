import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity"
import { Usuario } from "../../usuario/entities/usuario.entity"

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 20, nullable: false})
    numeroApolice: string

    @IsNotEmpty()
    @Column({nullable: false})
    anoCarro: number

    @IsNotEmpty()
    @Column({nullable: false})
    valor: number

    @IsNotEmpty()
    @Column({nullable: false})
    dataInicio: Date

    @IsNotEmpty()
    @Column({nullable: false})
    dataFim: Date

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE'
    })
    categoria: Categoria

    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE'
    })
    usuario: Usuario;

}