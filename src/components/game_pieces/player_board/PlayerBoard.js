/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PatternLines from "./PatternLines";
import {useSelector} from "react-redux";
import Wall from "./Wall";

export default function PlayerBoard({playerNumber}) {
  const players = useSelector(state => state.public.players);

  const playerBoard = players[playerNumber].board;

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
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          css={{marginTop: 20}}
        >
          <Grid>
            <PatternLines
              playerNumber={playerNumber}
              playerBoard={playerBoard}
            />
          </Grid>
          <Grid>
            <Wall
              playerNumber={playerNumber}
              playerBoard={playerBoard}
            />
          </Grid>
        </Grid>
      </Paper>
  </Grid>
  )
}