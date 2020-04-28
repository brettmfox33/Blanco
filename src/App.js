import React, {Fragment, useEffect} from 'react';
import './App.css';
import WelcomeModal from "./components/welcome/WelcomeModal";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "./redux/actionCreators";
import GameBoard from "./components/GameBoard";

function App({socket}) {
  const dispatch = useDispatch();

  const roundTiles = useSelector(state => state.public.gameState.roundTiles);
  const currentTurn = useSelector(state => state.private.currentTurn);
  const roomID = useSelector(state => state.public.roomID);
  const nextRoundFirstPlayer = useSelector(state => state.public.gameState.nextRoundFirstPlayer);

  useEffect(() => {
    socket.on("updatePublicState", publicState  => {
      dispatch(actionCreators.public.updatePublicState(publicState));
    });

    socket.on("saveClientID", clientID => {
      dispatch(actionCreators.private.saveClientID(clientID))
    });

    socket.on("setTurn", clientID => {
      dispatch(actionCreators.private.setTurn(clientID))
    });

    socket.on("setFirstPlayerTurn", playerNumber => {
      dispatch(actionCreators.public.setFirstPlayer(playerNumber));
    })
  }, []);

  useEffect(() => {
    if (roundTiles === 0 && currentTurn ) {
      dispatch(actionCreators.public.calculateScore());
      dispatch(actionCreators.public.changeTurn(nextRoundFirstPlayer));
      socket.emit("changeTurn", roomID, nextRoundFirstPlayer)
    }
  }, [roundTiles]);
  return (
    <Fragment>
      <GameBoard socket={socket}/>
      <WelcomeModal socket={socket}/>
    </Fragment>
  );
}

export default App;
