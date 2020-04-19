/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";

export default function ScoreBox({playerName, playerScore}) {
  return (
    <Grid
      item
      css={{border: "1px black solid", height: 69, width:191}}
    >
      {playerName}
      <br />
      Score: {playerScore}
    </Grid>
  )
}