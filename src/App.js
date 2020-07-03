import React, {Fragment, useEffect} from 'react';
import './App.css';
import WelcomeModal from "./components/welcome/WelcomeModal";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "./redux/actionCreators";
import GameBoard from "./components/GameBoard";
import preRenderImages from "./utils/preRenderImages";
import DisconnectModal from "./components/DisconnectModal";

function App({socket}) {
  const dispatch = useDispatch();

  const roundTiles = useSelector(state => state.public.gameState.roundTiles);
  const currentTurn = useSelector(state => state.private.currentTurn);
  const gameState = useSelector(state => state.public.gameState);
  const endRoundAnimations = useSelector(state => state.public.endRoundAnimations);
  const pendingAnimations = endRoundAnimations.pendingAnimations;
  const animate = endRoundAnimations.animate;
  const roomID = useSelector(state => state.public.roomID);
  const nextRoundFirstPlayer = useSelector(state => state.public.gameState.nextRoundFirstPlayer);
  const disconnected = useSelector(state => state.public.disconnected);
  
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

    socket.on("disconnectFromRoom", () => {
      dispatch(actionCreators.public.disconnect())
    });

    // Pre-render images. Whatever you do don't look in this function.
    preRenderImages();

  }, []);

  // End Round Pre-Animations
  useEffect(() => {
    if (roundTiles === 0 && currentTurn ) {
      dispatch(actionCreators.public.setEndRoundAnimations());
    }
  }, [roundTiles]);

  // End Round Post-Animations
  useEffect(() => {
    if (pendingAnimations === 0 && animate && currentTurn ) {
        dispatch(actionCreators.public.calculateScore());

        dispatch(actionCreators.public.changeTurn(nextRoundFirstPlayer));
        socket.emit("changeTurn", roomID, nextRoundFirstPlayer);
        dispatch(actionCreators.public.endTurn());
    }
  }, [animate, currentTurn, pendingAnimations, gameState]);

  return (
    !disconnected
      ?
      <Fragment>
        <GameBoard socket={socket}/>
        <WelcomeModal socket={socket}/>
      </Fragment>
      :
      <DisconnectModal />
  );
}

export default App;
