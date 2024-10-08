import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import Prova from "../entity/Prova";
import { AppDataSource } from "../dataSource";
import { StatusProvaType } from "../types/ProvaTypes";
import { LessThanOrEqual } from "typeorm";
import { Roles } from "../decorators/roles.decorators";

@Controller()
export class ProvaController {
    @Get("provasEmAberto")
    @Roles([{ modulo: 'Frank', permissao: 'Listar Dados do Frank' }])
    provasEmAberto(): Promise<Array<Prova>> {
        return AppDataSource.getRepository(Prova).find({
            where: {
                status: StatusProvaType.inscAberta
            }
        })
    }
}