import { createBrowserRouter } from "react-router-dom"
import EventosEmAberto from "../eventos/EventosEmAberto"
import AppAdmin from "../AppAdmin"
import Login from "../admin/login/Login"
import CrudAtleta from "../crud/CrudAtleta"
import CadastroUsuario from "../app/CadastroUsuario"
import CrudRaca from "../crud/CrudRaca"
import CrudCategoria from "../crud/CrudCategoria"
import CrudCampeonato from "../crud/CrudCampeonato"
import CrudProva from "../crud/CrudProva"
import Teste from "../testes/teste"
import AppUsuario from "../AppUsuario"
import LoginApp from "../app/LoginApp"
import HomeSite from "../HomeSite"

export const RotasAPP = createBrowserRouter([
  {
    path: "/",
    element: <HomeSite />,
  },
  {
    path: "/user",
    element: <AppUsuario />,
    children: [
      {
        path: "/user/LoginApp",
        element: <LoginApp />,
      },
      {
        path: "/user/CadastroUsuario",
        element: <CadastroUsuario />,
      }
    ]
  },
  {
    path: "/admin",
    element: <AppAdmin />,
    children: [
      {
        path: "/admin/CrudAtleta",
        element: <CrudAtleta />,
      },
      {
        path: "/admin/CrudRaca",
        element: <CrudRaca />,
      },
      {
        path: "/admin/CrudCategoria",
        element: <CrudCategoria />,
      },
      {
        path: "/admin/CrudCampeonato",
        element: <CrudCampeonato />,
      },
      {
        path: "/admin/CrudProva",
        element: <CrudProva />,
      },
      {
        path: "/admin/EventosEmAberto",
        element: <EventosEmAberto />,
      },
      {
        path: "/admin/CadastroUsuario",
        element: <CadastroUsuario />,
      },
      {
        path: "/admin/Teste",
        element: <Teste />,
      },
    ],
  },
])
