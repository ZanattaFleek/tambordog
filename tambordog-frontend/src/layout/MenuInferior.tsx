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

export default function MenuInferior() {
  const [value, setValue] = React.useState(0)

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(_event, newValue) => {
          console.log("New Value", newValue)
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Cadastro de Cão" icon={<PetsIcon />} />
        <BottomNavigationAction label="Eventos" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction
          label="Minha Conta"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}
