/** @jsx jsx */
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {jsx} from "@emotion/core";
import {useState} from "react";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";

/**
 * Step 2 in the Welcome Modal.
 * Enter player name and join game.
 **/
export default function EnterPlayerName({setOpen, playerNumber}) {
  const dispatch = useDispatch();

  const roomName = useSelector(state => state.roomName);

  const [playerName, setPlayerName] = useState(null);

  // Add Player to state and close Welcome Modal
  const joinGame = () => {
    setOpen(false);
    dispatch(actionCreators.addPlayer(playerName, playerNumber))
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
            disabled={!playerName}
          >
            Join Game
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}