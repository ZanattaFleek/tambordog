import { Body, Controller, Delete, Get, Inject, Post, Put } from "@nestjs/common";
import Prova from "../entity/Prova";
import { AppDataSource } from "../dataSource";
import { StatusProvaType } from "../types/ProvaTypes";
import { LessThanOrEqual } from "typeorm";
import { RespostaPadraoInterface } from "../interfaces/padrao.interfaces";
import UsuarioSessao from "../entity/sistema/UsuarioSessao";
import Usuario from "../entity/sistema/Usuario";
import ClsLoginUsuarioController from "./loginUsuario.controller.cls";

@Controller()
export class LoginUsuarioController {

    constructor() { }

    @Post("loginUsuario")
    public loginUsuario(
        @Body("cpf") cpf: string,
        @Body("senha") senha: string
    ): Promise<RespostaPadraoInterface<String>> {

        return new ClsLoginUsuarioController().logar(cpf, senha)


    }

}