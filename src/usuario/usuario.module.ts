import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { Usuarioservice } from "./service/usuario.service";
import { UsuarioController } from "./controller/usuario.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [Usuarioservice],
    controllers: [UsuarioController],
    exports: [Usuarioservice],
})
export class UsuarioModule { }