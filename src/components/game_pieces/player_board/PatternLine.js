/** @jsx jsx */
import Grid from "@material-ui/core/Grid";
import TileSquare from "../TileSquare";
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import {actionCreators} from "../../../redux/actionCreators";

export default function PatternLine({socket, playerBoard, patternLines, patternRowIndex, playerNumber}) {
  const dispatch = useDispatch();
  const dragState = useSelector(state => state.public.dragState);
  const currentPlayerTurn = useSelector(state => state.public.currentPlayerTurn);
  const numberOfPlayers = useSelector(state => state.public.numberOfPlayers);
  const roomID = useSelector(state => state.public.roomID);

  const dragColor = dragState.tileColor;
  const hoveredPatternLine = dragState.hoveredPatternLine;
  const dragLocation = dragState.fromCenter ? 'center' : 'factory';

  const [borderColor, setBorderColor] = useState('black');
  const [canDrop, setCanDrop] = useState(false);
  const patternRef = useRef(null);

  const onDrop = (e) => {
    if (currentPlayerTurn === playerNumber) {
      e.preventDefault();
      setBorderColor('black');
      if (canDrop) {
        let animateExtra = [250, 25] ;
        if (playerNumber === 2 || playerNumber === 4) {
          animateExtra = [240, 28]
        }
        dispatch(actionCreators.public.setAnimation(
          patternRef.current.getBoundingClientRect().x - dragState.originX + animateExtra[0],
          patternRef.current.getBoundingClientRect().y - dragState.originY + animateExtra[1]
        ));

        dispatch(actionCreators.public.dropTile(dragLocation, patternRowIndex, playerNumber));

        const newTurnNumber = numberOfPlayers === currentPlayerTurn ? 1 : currentPlayerTurn + 1;
        dispatch(actionCreators.public.changeTurn(newTurnNumber));
        socket.emit("changeTurn", roomID, newTurnNumber);

        dispatch(actionCreators.public.endTurn());
      }
      dispatch(actionCreators.public.clearDragState());
    }
  };

  const onDragOver = (e, currentPatternLine) => {
    if (currentPlayerTurn === playerNumber) {
      e.preventDefault();
      const patternColors = Object.values(currentPatternLine);
      const distinctPatternColors = patternColors.filter(item => item);

      // If a new pattern line is being hovered over then update the dragState
      if (hoveredPatternLine !== patternRowIndex) {
        dispatch(actionCreators.public.setDragStateHover(patternRowIndex));
      }

      /**
       * Check if the dragged tiles can be dropped in this pattern line. Check the following:
       * Is the pattern line empty or if it has the dragged color in it does it have room for more?
       * Is the dragged color space available on the corresponding wall board?
       **/
      if (
        (distinctPatternColors.length === 0 ||
          (distinctPatternColors.indexOf(dragColor) > -1 &&
            distinctPatternColors.length < patternColors.length)) &&
        !playerBoard.wall[patternRowIndex][dragColor]
      ) {
        setCanDrop(true);
        setBorderColor('green');
      } else {
        setCanDrop(false);
        setBorderColor('red');
      }
    }
  };

  // If we have dragged off the pattern line then set the dragState's dragState to 'dragging'
  const onDragLeave = () => {
    if (currentPlayerTurn === playerNumber) {
      setCanDrop(false);
      setBorderColor('black');
      dispatch(actionCreators.public.setDragStateDrag())
    }
  };

  return (
    <Grid
      ref={patternRef}
      container
      item
      direction="row-reverse"
      justify="flex-start"
      alignItems="flex-start"
      key={`pattern-${patternRowIndex}`}
    >
      {
        Object.keys(patternLines[patternRowIndex]).map(patternColumnIndex => {
          return (
            <TileSquare
              key={`Player${playerNumber}-${patternRowIndex}-${patternColumnIndex}`}
              color={patternLines[patternRowIndex][patternColumnIndex]}
              borderColor={borderColor}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              patternLine={patternLines[patternRowIndex]}
            />
          )
        })
      }
    </Grid>
  )
}