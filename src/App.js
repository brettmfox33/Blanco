import React, {Fragment, useEffect} from 'react';
import './App.css';
import WelcomeModal from "./components/welcome/WelcomeModal";
import {useDispatch} from "react-redux";
import {actionCreators} from "./redux/actionCreators";
import Main from "./components/Main";

function App({socket}) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("updateEntireState", state  => {
      dispatch(actionCreators.updateEntireState(state));
    });
  }, []);

  return (
    <Fragment>
      <Main />
      <WelcomeModal socket={socket}/>
    </Fragment>
  );
}

export default App;
