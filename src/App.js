import React, {Fragment, useEffect} from 'react';
import './App.css';
import WelcomeModal from "./components/welcome/WelcomeModal";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "./redux/actionCreators";
import GameBoard from "./components/GameBoard";
import preRenderImages from "./utils/preRenderImages";

function App({socket}) {
  const dispatch = useDispatch();

  const roundTiles = useSelector(state => state.public.gameState.roundTiles);
  const currentTurn = useSelector(state => state.private.currentTurn);
  const gameOver = useSelector(state => state.public.gameState.gameOver);
  const endRoundAnimations = useSelector(state => state.public.endRoundAnimations);
  const pendingAnimations = endRoundAnimations.pendingAnimations;
  const roomID = useSelector(state => state.public.roomID);
  const nextRoundFirstPlayer = useSelector(state => state.public.gameState.nextRoundFirstPlayer);
  useEffect(() => {
    socket.on("updatePublicState", publicState  => {
      if (publicState.endTurnAnimation.destinationX) {
        dispatch(actionCreators.private.setPendingState(publicState));
        dispatch(actionCreators.public.updateEndTurnAnimation(publicState.endTurnAnimation))
      }
      else {
        dispatch(actionCreators.public.updatePublicState(publicState));
      }
    });

    socket.on("saveClientID", clientID => {
      dispatch(actionCreators.private.saveClientID(clientID))
    });

    socket.on("setTurn", clientID => {
      dispatch(actionCreators.private.setTurn(clientID))
    });

    socket.on("setFirstPlayerTurn", playerNumber => {
      dispatch(actionCreators.public.setFirstPlayer(playerNumber));
    });

    // Pre-render images. Whatever you do don't look in this function.
    preRenderImages();

  }, []);

  useEffect(() => {
    if (!endRoundAnimations.animationFinished && roundTiles === 0 && currentTurn ) {
      dispatch(actionCreators.public.setEndRoundAnimations());

      dispatch(actionCreators.public.changeTurn(nextRoundFirstPlayer));
      socket.emit("changeTurn", roomID, nextRoundFirstPlayer);
    }
  }, [roundTiles]);

  useEffect(() => {
    if (pendingAnimations === 0 && endRoundAnimations.animate && currentTurn ) {
        dispatch(actionCreators.public.calculateScore());

        dispatch(actionCreators.public.endTurn());
    }
  }, [pendingAnimations]);

  useEffect(() => {
    if (gameOver) {
      dispatch(actionCreators.public.endGame());

      dispatch(actionCreators.public.endTurn());
    }
  },
    [gameOver]);

  return (
    <Fragment>
      <GameBoard socket={socket}/>
      <WelcomeModal socket={socket}/>
    </Fragment>
  );
}

export default App;
