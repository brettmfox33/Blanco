/** @jsx jsx */
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {jsx} from "@emotion/core";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
/**
 * Step 0 in the Welcome Modal.
 * Create a new game or route to an existing game.
 */
export default function SelectGameType({setStep, setOpen, socket, setPlayerNumber}) {
  const dispatch = useDispatch();
  const [roomID, setRoomID] = useState(null);
  const [joinError, setJoinError] = useState(null);

  const roomIDEnter = () => {
    socket.emit('joinRoom', roomID);
  };

  useEffect(() => {
    socket.on("joinFailure", error => {
      setJoinError(error);
    });

    socket.on("joinSuccess", (newState, playerNumber) => {
      setStep(2);
      dispatch(actionCreators.updateEntireState(newState));
      setPlayerNumber(playerNumber);
    });
  }, []);

  return (
      <div id="select-game-type">
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
              color="primary"
              onClick={() => setStep(1)}
            >
              New Game
            </Button>
          </Grid>
          <Grid>
            <TextField
              error={joinError ? true : false}
              margin="dense"
              id="game-code"
              label="Game Code"
              type="text"
              onChange={event => setRoomID(event.target.value)}
              helperText={joinError ? joinError: null}
            />
          </Grid>
          <Grid>
          <Button
            onClick={() => roomIDEnter()}
          >
            Enter
          </Button>
        </Grid>
        </Grid>
      </div>
  )
}
