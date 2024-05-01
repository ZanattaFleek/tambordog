import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import styled from "@emotion/styled"

// const Offset = styled("div")(({ theme }) => theme.mixins.toolbar)

export default function TopBar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={toogleDrawer}
            edge="start"
            sx={{ mr: 2, flexGrow: 0 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <img
              src="imagens/logoFundoBranco.png"
              width={150}
              alt="Vamos Sorrir"
            />
          </Box>

          {/*
              <Box sx={{ flexGrow: 0, mr: 1, textAlign: 'right' }} >
                <Button variant='contained' disableElevation onClick={() => navigate( '/SetUnidade' )}>{layoutState.descricaoUnidadeAtual}</Button>
              </Box>
    
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Configurações">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <ManageAccountsIcon sx={{ border: '2px solid white', borderRadius: '50%', color: 'white' }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean( anchorElUser )}
                  onClose={handleCloseUserMenu}
                >
                  {opcoesMenu.map( ( menu: MenuOpcoesInterface, indice: number ) => (
                    <MenuItem deslocamento={0} key={indice} menu={menu} />
                  ) )}
                </Menu>


    
              </Box>

              */}
        </Toolbar>
      </AppBar>
      {/*
      <Offset />
            */}
    </>
  )
}
