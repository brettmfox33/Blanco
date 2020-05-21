/** @jsx jsx */
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import WallSquare from "./WallSquare";

export default function Wall({playerNumber, playerBoard}) {
  const wall = playerBoard.wall;

  return (
    Object.keys(wall).map(wallRowIndex => {
      return (
        <Grid
          container item
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
          key={`wall-${wallRowIndex}`}
        >
          {
            Object.keys(wall[wallRowIndex]).map(wallColumnColor => {
              return(
                <WallSquare
                  key={`Player${playerNumber}-${wallRowIndex}-${wallColumnColor}`}
                  color={wallColumnColor}
                  filled={wall[wallRowIndex][wallColumnColor]}
                />
              )
            })
          }
        </Grid>
      )
    })
  )
}