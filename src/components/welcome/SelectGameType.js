/** @jsx jsx */
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {jsx} from "@emotion/core";
import DialogTitle from "@material-ui/core/DialogTitle";

/**
 * Step 0 in the Welcome Modal.
 * Create a new game or route to an existing game.
 */
export default function SelectGameType({setStep}) {

  return (
      <div
        id="select-game-type"
         css={{justifyContent: "center", alignItems: "center", display: "grid"}}
      >
        <DialogContentText>
          Start a new game or enter a room-code to join a game.
        </DialogContentText>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStep(1)}
            >
              New Game
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStep(2)}
            >
              Join Game
            </Button>
          </Grid>
        </Grid>
      </div>
  )
}
