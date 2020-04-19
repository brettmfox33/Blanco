/** @jsx jsx */
import {jsx} from "@emotion/core";
import FloorLineTile from "./FloorLineTile";
import Grid from "@material-ui/core/Grid";

export default function FloorLine({playerNumber, playerBoard}) {
  const floorLine = playerBoard.floorLine;

  return (
    <Grid
      container
      item
      direction="row"
    >
      {
        Object.keys(floorLine).map(floorLineIndex => {
          return (
            <FloorLineTile
              key={`Floor-${floorLineIndex}`}
              penaltyAmount={floorLine[floorLineIndex].penalty}
              tileColor={floorLine[floorLineIndex].color}
            />
          )
        })
      }
    </Grid>
  )
}