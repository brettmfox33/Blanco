/** @jsx jsx */
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {jsx} from "@emotion/core";
import {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import {IconButton} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

  /**
   * Step 2 in the Welcome Modal.
   * Enter player name and join game.
   **/
export default function EnterRoomInfo({socket, setOpen, setStep}) {
  const dispatch = useDispatch();

  const roomName = useSelector(state => state.roomName);

  const [playerName, setPlayerName] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [joinError, setJoinError] = useState(null);

  useEffect(() => {
    socket.on("joinFailure", error => {
      setJoinError(error);
    });

    socket.on("joinSuccess", (newState, playerNumber) => {
      setOpen(false);
      dispatch(actionCreators.updateEntireState(newState));
      socket.emit("stateChange", newState, newState.roomID);
    });
  }, []);

  // Add Player to state and close Welcome Modal
  const joinGame = () => {
    socket.emit('joinRoom', roomID, playerName);
  };

  return (
    <div id="select-game-type">
      <DialogContentText>
        Enter Player Name for Room: {roomName}
      </DialogContentText>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid>
          <IconButton
            onClick={() => setStep(0)}>
            <ArrowBackIosIcon />
          </IconButton>
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
          <TextField
            margin="dense"
            id="player-name"
            label="Player Name"
            type="text"
            onChange={event => {setPlayerName(event.target.value)}}
            val={playerName}
          />
        </Grid>
        <Grid>
          <Button
            color="primary"
            onClick={() => joinGame()}
            disabled={!playerName || !roomID}
          >
            Join Game
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}