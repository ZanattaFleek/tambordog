import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Avatar, AvatarGroup, Box, Button, Grid } from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { useEffect } from "react"
import ClsCrud from "../utils/ClsCrud"
import ClsBackEnd from "../utils/ClsBackEnd"
import { ProvaInterface } from "../../../tambordog-backend/src/interfaces/prova.interfaces"

interface propsCardEvento {
  titulo: string
  imagem: string
  cidade: string
  uf: string
  data: string
  qtdInscritos: number
}

export default function CardEvento({
  titulo,
  imagem,
  cidade,
  uf,
  data,
  qtdInscritos,
}: propsCardEvento) {

  return (
    <>

      <Card sx={{ display: "flex", marginTop: 1.5, maxWidth: '300px' }}>

        <Grid container>
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: { xs: 64 }, height: { xs: 64 } }}
              image={"/".concat(imagem)}
              alt="Circuito Tambor Dog"
            />
          </Grid>

          <Grid item>
            <Grid container direction="column">
              <Grid item xs>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginLeft: "5px" }}
                >
                  {titulo}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ marginLeft: "5px" }}
                >
                  {cidade} - {uf} - {data}
                </Typography>
              </Grid>

            </Grid>
          </Grid>

        </Grid>

      </Card>

    </>
  )
}
