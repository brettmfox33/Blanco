/** @jsx jsx */
import Grid from "@material-ui/core/Grid";
import TileSquare from "../TileSquare";
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {actionCreators} from "../../../redux/actionCreators";

export default function PatternLine({playerBoard, patternLines, patternRowIndex, playerNumber}) {
  const dispatch = useDispatch();
  const dragState = useSelector(state => state.public.dragState);
  const currentPlayerTurn = useSelector(state => state.public.currentPlayerTurn);

  const dragColor = dragState.tileColor;
  const hoveredPatternLine = dragState.hoveredPatternLine;
  const dragLocation = dragState.fromCenter ? 'center' : 'factory';

  const [borderColor, setBorderColor] = useState('black');
  const [canDrop, setCanDrop] = useState(false);

  const onDrop = (e) => {
    if (currentPlayerTurn === playerNumber) {
      e.preventDefault();
      setBorderColor('black');
      if (canDrop) {
        dispatch(actionCreators.public.dropTile(dragLocation, patternRowIndex, playerNumber));
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
      container
      item
      direction="row"
      justify="flex-end"
      alignItems="flex-start"
      key={`pattern-${patternRowIndex}`}
      onDragOver={(event) => onDragOver(event, patternLines[patternRowIndex])}
      onDrop={(event) => onDrop(event)}
      onDragLeave={(event) => onDragLeave()}
    >
      {
        Object.keys(patternLines[patternRowIndex]).map(patternColumnIndex => {
          return (
            <TileSquare
              key={`Player${playerNumber}-${patternRowIndex}-${patternColumnIndex}`}
              color={patternLines[patternRowIndex][patternColumnIndex]}
              borderColor={borderColor}
            />
          )
        })
      }
    </Grid>
  )
}