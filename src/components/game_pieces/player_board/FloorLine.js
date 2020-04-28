/** @jsx jsx */
import {jsx} from "@emotion/core";
import FloorLineTile from "./FloorLineTile";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {actionCreators} from "../../../redux/actionCreators";
export default function FloorLine({socket,playerBoard, playerNumber}) {
  const dispatch = useDispatch();

  const [borderColor, setBorderColor] = useState('black');

  const currentPlayerTurn = useSelector(state => state.public.currentPlayerTurn);
  const dragState = useSelector(state => state.public.dragState);
  const hoveredPatternLine = dragState.hoveredPatternLine;
  const roomID = useSelector(state => state.public.roomID);
  const numberOfPlayers = useSelector(state => state.public.numberOfPlayers);

  const floorLine = playerBoard.floorLine;
  const dragLocation = dragState.fromCenter ? 'center' : 'factory';

  const onDragOver = (e) => {
    if (currentPlayerTurn === playerNumber) {
      e.preventDefault();
      // If a new pattern line is being hovered over then update the dragState
      if (hoveredPatternLine !== 'floor') {
        dispatch(actionCreators.public.setDragStateHover('floor'));
      }
      setBorderColor('green');
    }
  };

  const onDrop = (e) => {
    if (currentPlayerTurn === playerNumber) {
      e.preventDefault();
      setBorderColor('black');
      dispatch(actionCreators.public.dropTileFloor(dragLocation, playerNumber));

      const newTurnNumber = numberOfPlayers === currentPlayerTurn ? 1 : currentPlayerTurn + 1;
      dispatch(actionCreators.public.changeTurn(newTurnNumber));
      socket.emit("changeTurn", roomID, newTurnNumber);

      dispatch(actionCreators.public.clearDragState());
    }
  };

  // If we have dragged off the pattern line then set the dragState's dragState to 'dragging'
  const onDragLeave = () => {
    if (currentPlayerTurn === playerNumber) {
      setBorderColor('black');
      dispatch(actionCreators.public.setDragStateDrag())
    }
  };

  return (
    <Grid
      container
      item
      direction="row"
      onDragOver={event => onDragOver(event)}
      onDragLeave={(event) => onDragLeave()}
      onDrop={(event) => onDrop(event)}
    >
      {
        Object.keys(floorLine).map(floorLineIndex => {
          return (
            <FloorLineTile
              key={`Floor-${floorLineIndex}`}
              borderColor={borderColor}
              penaltyAmount={floorLine[floorLineIndex].penalty}
              tileColor={floorLine[floorLineIndex].color ? floorLine[floorLineIndex].color : 'white'}
            />
          )
        })
      }
    </Grid>
  )
}