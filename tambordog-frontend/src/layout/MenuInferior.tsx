import React from "react"

import {
  BottomNavigation,
  BottomNavigationAction,
  Icon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material"

import HomeIcon from "@mui/icons-material/Home"
import AddIcon from "@mui/icons-material/Add"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import PersonIcon from "@mui/icons-material/Person"
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed"
import SportsScoreIcon from "@mui/icons-material/SportsScore"
// import CrudCao from "../crud/CrudCao"

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"

import { useNavigate } from "react-router-dom"

export default function MenuInferior() {
  const [value, setValue] = React.useState(0)

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const navigate = useNavigate()

  const irPara = (url: string) => {
    navigate(url)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("oi....")
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const settingsJSON = [
    {
      id: 1,
      menu: "Atleta",
      icon: "person_outline_outlined",
      path: "/CrudAtleta",
    },
    {
      id: 2,
      menu: "Raça",
      icon: "pets",
      path: "/CrudRaca",
    },
    {
      id: 3,
      menu: "Categoria",
      icon: "military_tech",
      path: "/CrudCategoria",
    },
    {
      id: 4,
      menu: "Campeonato",
      icon: "emoji_events",
      path: "/CrudCampeonato",
    },
    {
      id: 5,
      menu: "Prova",
      icon: "sports_score",
      path: "/CrudProva",
    },
  ]

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

        {/*
        
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
          label="Campeonato"
          icon={<EmojiEventsIcon />}
          onClick={() => irPara("/CrudCampeonato")}
        />

        <BottomNavigationAction
          label="Prova"
          icon={<SportsScoreIcon />}
          onClick={() => irPara("/CrudProva")}
        />

        */}

        <BottomNavigationAction
          label="Cadastros"
          icon={<AddIcon />}
          onClick={(ev) => handleOpenUserMenu(ev)}
        />
      </BottomNavigation>
      <Menu
        sx={{ mt: "-55px", ml: "25px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settingsJSON.map((setting) => (
          <MenuItem key={setting.id} onClick={() => irPara(setting.path)}>
            <Icon sx={{ textAlign: "center", marginRight: 1 }}>
              {setting.icon}
            </Icon>
            <Typography textAlign="center">{setting.menu}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  )
}
