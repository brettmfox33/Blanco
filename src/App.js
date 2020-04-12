import React, {Fragment} from 'react';
import './App.css';
import WelcomeModal from "./components/welcome/WelcomeModal";
import {useDispatch} from "react-redux";
import {actionCreators} from "./redux/actionCreators";

function App({socket}) {
  const dispatch = useDispatch();

  socket.on("updateState", state  => {
    dispatch(actionCreators.updateEntireState(state));
  });

  return (
    <Fragment>
      <WelcomeModal socket={socket}/>
    </Fragment>
  );
}

export default App;
