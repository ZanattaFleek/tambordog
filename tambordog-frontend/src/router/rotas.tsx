import { createBrowserRouter } from "react-router-dom"
import EventosEmAberto from "../eventos/EventosEmAberto"
import App from "../App"
import Login from "../login/Login"
import CrudAtleta from "../crud/CrudAtleta"
import CadastroUsuario from "../app/CadastroUsuario"
import CrudRaca from "../crud/CrudRaca"
import CrudCategoria from "../crud/CrudCategoria"
import CrudCampeonato from "../crud/CrudCampeonato"
import CrudProva from "../crud/CrudProva"

export const RotasAPP = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/CrudAtleta",
        element: <CrudAtleta />,
      },
      {
        path: "/CrudRaca",
        element: <CrudRaca />,
      },
      {
        path: "/CrudCategoria",
        element: <CrudCategoria />,
      },
      {
        path: "/CrudCampeonato",
        element: <CrudCampeonato />,
      },
      {
        path: "/CrudProva",
        element: <CrudProva />,
      },
      {
        path: "/EventosEmAberto",
        element: <EventosEmAberto />,
      },
      {
        path: "/CadastroUsuario",
        element: <CadastroUsuario />,
      },
    ],
  },
])
