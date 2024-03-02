import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, AvatarGroup, Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface propsCardEvento {
  titulo: string;
  imagem: string;
  cidade: string;
  uf: string;
  data: string;
  qtdInscritos: number;
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
      <Card sx={{ display: "flex", marginTop: 1.5 }}>
        <Grid container>
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: { xs: 64, sm: 128 }, height: { xs: 64, sm: 128 } }}
              image={"/".concat(imagem)}
              alt="Circuito Tambor Dog"
            />
          </Grid>
          <Grid item>
            <Grid item container direction="column">
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
              <Grid item container direction="column">
                <Grid
                  item
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    marginLeft: "5px",
                  }}
                >
                  <AvatarGroup max={qtdInscritos}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                    />
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src="/static/images/avatar/4.jpg"
                    />
                    <Avatar
                      alt="Trevor Henderson"
                      src="/static/images/avatar/5.jpg"
                    />
                  </AvatarGroup>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ textAlign: "right" }}
                  >
                    Inscritos
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <InfoOutlinedIcon />
            <FavoriteBorderIcon />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
