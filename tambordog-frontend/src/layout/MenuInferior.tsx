import React from "react"

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material"

import HomeIcon from "@mui/icons-material/Home"
import PetsIcon from "@mui/icons-material/Pets"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import PersonIcon from "@mui/icons-material/Person"
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed"
import CrudCao from "../crud/CrudCao"

import { useNavigate } from "react-router-dom"

export default function MenuInferior() {
  const [value, setValue] = React.useState(0)

  const navigate = useNavigate()

  const irPara = (url: string) => {
    navigate(url)
  }

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => irPara("/")}
        />
        <BottomNavigationAction
          label="Atletas"
          icon={<PersonIcon />}
          onClick={() => irPara("/CrudAtleta")}
        />

        <BottomNavigationAction
          label="Raça"
          icon={<PetsIcon />}
          onClick={() => irPara("/CrudRaca")}
        />

        <BottomNavigationAction
          label="Categoria"
          icon={<DynamicFeedIcon />}
          onClick={() => irPara("/CrudCategoria")}
        />

        <BottomNavigationAction
          label="Minha Conta"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}
