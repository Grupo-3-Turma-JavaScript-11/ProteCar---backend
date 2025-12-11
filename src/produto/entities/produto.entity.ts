import { IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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
}