/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";

export default function ScoreBox({playerScore}) {

  return (
    <Grid
      item
      container
      css={{height: 69, width:191, fontSize: 40, fontFamily: 'Great Vibes'}}
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        Score: {playerScore}
      </Grid>
    </Grid>
  )
}