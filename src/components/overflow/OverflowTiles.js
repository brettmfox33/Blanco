/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import {useState} from "react";

export default function OverflowTiles( ) {
  const dispatch = useDispatch();

  const myCurrentTurn = useSelector(state => state.private.currentTurn);

  const [colorToHide, setColorToHide] = useState(null);

  const onDragStart = (event, color) => {
    dispatch(actionCreators.public.dragStart(null, color));

    // Set the drag image
    let dragImage = new Image();
    dragImage.src = require(`../../images/tiles/${color}.png`);
    event.dataTransfer.setDragImage(dragImage,25,25);

    // Set the colors to hide in the factory display
    setColorToHide(color);
  };

  const onDragEnd = (event) => {
    dispatch(actionCreators.public.clearDragState());
    // Show the colors back in the factory display
    setColorToHide(null);
  };

  const overflowTiles = useSelector(state => state.public.gameState.overflowTiles);
  return (
    Object.keys(overflowTiles).map(color => {
      return (
        Array.from({length: overflowTiles[color]}, (_, amount) => {
          return (
            <img
              onDragStart={(event) => onDragStart(event, color)}
              onDragEnd={(event) => onDragEnd(event)}
              alt={`overflowTile-${color}`}
              draggable={color !== 'firstPlayerToken'}
              src={require(`../../images/tiles/${color}.png`)}
              css={[
                {
                  border: `1px black solid`, margin: 1
                },
                color === colorToHide ? {opacity: ".7"} : null,
                myCurrentTurn ? {cursor: 'move'} : null
              ]}
            />
          )
        })
      )
    })
  )
}