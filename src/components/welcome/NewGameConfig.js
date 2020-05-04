/** @jsx jsx */
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {jsx} from "@emotion/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

/**
 * Step 1 in the Welcome Modal.
 * Create a new game by inputting player number and room name.
 **/
export default function NewGameConfig({socket, setStep}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const roomID = useSelector(state => state.public.roomID);
  const state = useSelector(state => state);

  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerError, setPlayerError] = useState(null);

  const createGame = () => {
    dispatch(actionCreators.public.createGame(numberOfPlayers, playerName))
  };

  const onChange = (event) => {
    const name = event.target.value;
    const lowerName = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();

    setPlayerName(lowerName);

    if (event.target.value.length > 10){
      setPlayerError("Must be less than 10 characters")
    }
    else {
      setPlayerError(null)
    }
  };

  useEffect(() => {
    if (roomID) {
      socket.emit('createRoom', state);
      setStep(3);
    }
  }, [roomID]);

  return (
      <div id="new-game-config">
        <DialogContentText>
          Enter Players and name
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
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel>Number of Players</InputLabel>
              <Select
                label="Number of Players"
                onChange={event => {setNumberOfPlayers(event.target.value)}}
                value={numberOfPlayers}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField
              error={playerError ? true : false}
              helperText={playerError}
              margin="dense"
              id="host-name"
              label="Player Name"
              type="text"
              onChange={event => onChange(event)}
              val={playerName}
            />
          </Grid>
          <Grid>
            <Button
              color="primary"
              onClick={() => createGame()}
              disabled={!numberOfPlayers || !playerName || playerError ? true : false}
            >
              Start Game
            </Button>
          </Grid>
        </Grid>
      </div>

  )
}