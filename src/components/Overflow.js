/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import OverflowTiles from "./overflow/OverflowTiles";
import Image from '../images/overflowBackground.jpg';

export default function Overflow() {
  const roomName = useSelector(state => state.public.roomName);
  return (
    <div
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
            <Grid>
              !Blanco Logo!
            </Grid>
            <Grid>
              Room: {roomName}
            </Grid>
            <Grid
              css={{paddingLeft: 10}}
            >
              <OverflowTiles />
            </Grid>
          </Grid>
        </Paper>
    </div>
  )
}