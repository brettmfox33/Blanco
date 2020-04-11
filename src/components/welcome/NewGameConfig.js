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
import {useState} from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function NewGameConfig({setOpen, setStep}) {
  const classes = useStyles();
  const [playerNumber, setPlayerNumber] = useState('');
  const [roomName, setRoomName] = useState('');

  return (
      <div id="select-game-type">
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
                onChange={event => {setPlayerNumber(event.target.value)}}
                value={playerNumber}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField
              margin="dense"
              id="code"
              label="Room Name"
              type="text"
              onChange={event => {setRoomName(event.target.value)}}
              val={roomName}
            />
          </Grid>
          <Grid>
            <Button
              color="primary"
              onClick={() => setOpen(false)}
              disabled={!playerNumber || !roomName}
            >
              Start Game
            </Button>
          </Grid>
        </Grid>
      </div>

  )
}