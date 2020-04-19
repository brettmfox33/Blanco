/** @jsx jsx */
import {jsx} from "@emotion/core";
import TileSquare from "../TileSquare";
import Grid from "@material-ui/core/Grid";

export default function PatternLines({playerNumber, playerBoard}) {
  const patternLines = playerBoard.patternLines;

  return (
    Object.keys(patternLines).map(patternRowIndex => {
      return (
        <Grid
          container
          item
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
          key={`pattern-${patternRowIndex}`}
        >
          {
            Object.keys(patternLines[patternRowIndex]).map(patternColumnIndex => {
              return (
                <TileSquare
                  key={`Player${playerNumber}-${patternRowIndex}-${patternColumnIndex}`}
                  color={patternLines[patternRowIndex][patternColumnIndex]}
                />
              )
            })
          }
        </Grid>
      )
    })
  )}