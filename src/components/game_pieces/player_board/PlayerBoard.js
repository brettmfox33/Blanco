/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PatternLines from "./PatternLines";
import {useSelector} from "react-redux";
import Wall from "./Wall";
import FloorLine from "./FloorLine";
import ScoreBox from "./ScoreBox";
import Image from '../../../images/gameBoardBackground.jpg';

export default function PlayerBoard({playerNumber, socket}) {
  const players = useSelector(state => state.public.players);
  const currentPlayerTurn = useSelector(state => state.public.currentPlayerTurn);
  const gameOver = useSelector(state => state.public.gameState.gameOver);
  const endGameStats = useSelector(state => state.public.gameState.endGameStats);

  const playerBoard = players[playerNumber].board;
  const playerName = players[playerNumber].playerName;
  const playerScore = players[playerNumber].score;

  return (
    <Grid
      container
      css={{margin: 20}}
      id={`player-${playerNumber}`}
    >
      {
        currentPlayerTurn === playerNumber && !gameOver
          ? <Grid
            container
            css={{position: 'absolute', width: 150, marginLeft: -5, marginTop: -5}}
          >
            <img
              draggable={false}
              alt="cornerBorder"
              src={require(`../../../images/cornerBorder.png`)}
            >
            </img>
          </Grid>
          : null
      }

      <Grid
        container
        css={{position: 'absolute', height: 110, width: 200,
          fontSize: 40, fontFamily: 'Great Vibes', justifyContent: 'center', alignItems: 'center'
        }}
      >
        <Grid>
          {endGameStats.winners.indexOf(playerName) > -1 ? `${playerName} wins!` : playerName}
        </Grid>
      </Grid>
      <Paper
        css={{width: '100%', height: '100%', backgroundImage:`url(${Image})`}}
        elevation={3}
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
              socket={socket}
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
              socket={socket}
              playerBoard={playerBoard}
              playerNumber={playerNumber}
            />
          </Grid>

          {/* SCORE BOX */}
          <Grid
            css={{marginTop: 10, marginLeft: 10}}
          >
            <ScoreBox
              playerScore={playerScore}
            />
          </Grid>
        </Grid>
      </Paper>
  </Grid>
  )
}