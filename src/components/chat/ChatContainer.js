/** @jsx jsx */
import {jsx} from "@emotion/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from '@material-ui/icons/Send';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import {useState} from "react";

export default function ChatContainer() {
  const dispatch = useDispatch();

  const gameChat = useSelector(state => state.public.gameChat);
  const playerNumber = useSelector(state => state.private.playerNumber);
  const thisPlayerName = useSelector(state => state.public.players[playerNumber].playerName);
  const [message, setMessage] = useState('');

  const sendMessage = (event) => {
    dispatch(actionCreators.public.sendMessage(playerNumber, message));
    setMessage('');
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-end"
      alignItems="center"
    >
      <Grid
        css={{position:"absolute", marginBottom: 20}}
      >
        <Paper
          elevation={0}
          css={{
            backgroundColor: 'white', width: 350, height: 300, opacity: .7,
            borderTop: "solid black .25px",
            borderLeft: "solid black .25px",
            borderRight: "solid black .25px",
            borderRadius: "8px 8px 0 0",
            padding: 10
          }}
          square
        >
          {
            gameChat.map((messageDict, index) => {
              let currentPlayerMessage = false;
              if (thisPlayerName === messageDict.playerName) {
                currentPlayerMessage = true
              }
              return (
                <Grid
                  container
                  direction="row"
                  justify={currentPlayerMessage ? "flex-end" : "flex-start"}
                  key={index}
                >
                  <span
                    css={currentPlayerMessage
                      ? {color: "green"}
                      : {color: "red"}}
                  >
                    {messageDict.playerName}
                  </span>
                  : {messageDict.message}
                </Grid>
              )
            })
          }
        </Paper>
        <InputBase
          placeholder="Write a message..."
          onChange={event => setMessage(event.target.value)}
          value={message}
          inputProps={{ 'aria-label': 'naked' }}
          endAdornment={
            <InputAdornment
              onClick={() => sendMessage()}
              css={{cursor: "pointer"}}
              position="end"><SendIcon />
            </InputAdornment>
          }
          css={{
            borderLeft:"solid black .25px",
            borderBottom:"solid black .25px",
            borderRight:"solid black .25px",
            width: "100%", backgroundColor: "white", opacity: .7,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 10,
            borderRadius: "0 0 8px 8px",
          }}
        />
      </Grid>
    </Grid>

  )
}