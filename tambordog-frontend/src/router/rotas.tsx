import { createBrowserRouter } from "react-router-dom"
import CadastroAtleta from "../atleta/CadastroAtleta"
import EventosEmAberto from "../eventos/EventosEmAberto"
import App from "../App"
import Login from "../login/Login"

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
        path: "/CadastroAtleta",
        element: <CadastroAtleta />,
      },
      {
        path: "/EventosEmAberto",
        element: <EventosEmAberto />,
      },
    ],
  },
])
