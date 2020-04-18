import React, {Fragment, useEffect} from 'react';
import './App.css';
import WelcomeModal from "./components/welcome/WelcomeModal";
import {useDispatch} from "react-redux";
import {actionCreators} from "./redux/actionCreators";
import GameBoard from "./components/GameBoard";

function App({socket}) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("updateEntireState", publicState  => {
      dispatch(actionCreators.updateEntireState(publicState));
    });
  }, []);

  return (
    <Fragment>
      <GameBoard />
      <WelcomeModal socket={socket}/>
    </Fragment>
  );
}

export default App;
