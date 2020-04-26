/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";

export default function ScoreBox({playerNumber, playerName, playerScore}) {
  const currentPlayerTurn = useSelector(state => state.public.currentPlayerTurn);

  return (
    <Grid
      item
      css={{border: "1px black solid", height: 69, width:191}}
    >
      {playerName}
      <br />
      Score: {playerScore}
      <br />
      Current Turn: {currentPlayerTurn === playerNumber ? 'True' : 'False'}
    </Grid>
  )
}