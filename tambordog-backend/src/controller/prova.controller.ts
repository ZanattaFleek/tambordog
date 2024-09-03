import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import Prova from "../entity/Prova";
import { AppDataSource } from "../dataSource";
import { StatusProvaType } from "../types/ProvaTypes";
import { LessThanOrEqual } from "typeorm";

@Controller()
export class ProvaController {
    @Get("provasEmAberto")
    provasEmAberto(): Promise<Array<Prova>> {
        return AppDataSource.getRepository(Prova).find({
            where: {
                status: StatusProvaType.inscAberta
            }
        })
    }
}