import React, {Fragment, useEffect} from 'react';
import './App.css';
import WelcomeModal from "./components/welcome/WelcomeModal";
import {useDispatch} from "react-redux";
import {actionCreators} from "./redux/actionCreators";
import GameBoard from "./components/GameBoard";

function App({socket}) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("updateState", publicState  => {
      dispatch(actionCreators.public.updatePublicState(publicState));
    });

    socket.on("saveClientID", clientID => {
      dispatch(actionCreators.private.saveClientID(clientID))
    });

    socket.on("setTurn", clientID => {
      dispatch(actionCreators.private.setTurn(clientID))
    })
  }, []);

  return (
    <Fragment>
      <GameBoard />
      <WelcomeModal socket={socket}/>
    </Fragment>
  );
}

export default App;
