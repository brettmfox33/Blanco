/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FactoryOffer from "./FactoryOffer";

export default function PlayerBoard({playerNumber}) {
  return (
    <Grid
      container
      item
      css={{margin: 10}}
      id={`player-${playerNumber}`}
    >
      <Paper
        css={{width: '100%', height: '100%'}}
        elevation={2}
      >
        <FactoryOffer />
      </Paper>

  </Grid>
  )
}