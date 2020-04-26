/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PatternLines from "./PatternLines";
import {useSelector} from "react-redux";
import Wall from "./Wall";
import FloorLine from "./FloorLine";
import ScoreBox from "./ScoreBox";

export default function PlayerBoard({playerNumber}) {
  const players = useSelector(state => state.public.players);

  const playerBoard = players[playerNumber].board;
  const playerName = players[playerNumber].playerName;
  const playerScore = players[playerNumber].score;

  return (
    <Grid
      container
      css={{margin: 20}}
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
          css={{marginTop: 5}}
        >
          {/* PATTERN LINES */}
          <Grid>
            <PatternLines
              playerNumber={playerNumber}
              playerBoard={playerBoard}
            />
          </Grid>

          {/* WALL PATTERN */}
          <Grid>
            <Wall
              playerNumber={playerNumber}
              playerBoard={playerBoard}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
        >
          {/* FLOOR LINE */}
          <Grid
            css={{marginLeft: 40, marginTop: 10}}
          >
            <FloorLine
              playerBoard={playerBoard}
            />
          </Grid>

          {/* SCORE BOX */}
          <Grid
            css={{marginTop: 10, marginLeft: 10}}
          >
            <ScoreBox
              playerNumber={playerNumber}
              playerName={playerName}
              playerScore={playerScore}
            />
          </Grid>
        </Grid>
      </Paper>
  </Grid>
  )
}