/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import OverflowTiles from "./overflow/OverflowTiles";
import Image from '../images/overflowBackground.jpg';
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

export default function Overflow() {
  return (
    <Grid
      container
      id="overflow"
      css={{
        gridArea: 'overflow',
        display: 'flex',
        paddingBottom: 40

      }}
    >
        <Paper
          css={{width: '100%', height: '100%', marginTop: 20, backgroundImage:`url(${Image})`}}
          elevation={3}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
            css={{fontFamily: 'Great Vibes', fontSize: 60}}
            >
              Blanco
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <OverflowTiles />
            </Grid>
          </Grid>
        </Paper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <IconButton
          css={{position: 'absolute'}}
          aria-label="info"
        >
          <InfoOutlinedIcon
            fontSize="large"
          />
        </IconButton>
      </Grid>
    </Grid>
  )
}