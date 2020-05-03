/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import {useState} from "react";

export default function OverflowTiles() {
  const dispatch = useDispatch();

  const myCurrentTurn = useSelector(state => state.private.currentTurn);
  const overflowTiles = useSelector(state => state.public.gameState.overflowTiles);

  const [colorToHide, setColorToHide] = useState(null);

  const onDragStart = (event, color) => {
    dispatch(actionCreators.public.dragStart(null, color));

    // Set the drag image
    let tileCount = overflowTiles[color];
    if (tileCount > 5) {
      tileCount = 5
    }

    let dragImage = new Image();
    dragImage.src = require(`../../images/tiles/ghost/${tileCount}/${color}.png`);
    event.dataTransfer.setDragImage(dragImage,25,25);

    // Set the colors to hide in the factory display
    setColorToHide(color);
  };

  const onDragEnd = (event) => {
    dispatch(actionCreators.public.clearDragState());
    // Show the colors back in the factory display
    setColorToHide(null);
  };

  return (
    Object.keys(overflowTiles).map(color => {
      return (
        Array.from({length: overflowTiles[color]}, (_, index) => {
          return (
            <img
              key={`overflowTile-${color}-${index}`}
              onDragStart={(event) => onDragStart(event, color)}
              onDragEnd={(event) => onDragEnd(event)}
              alt={`overflowTile-${color}`}
              draggable={color !== 'firstPlayerToken' && myCurrentTurn}
              src={require(`../../images/tiles/${color}.png`)}
              css={[
                {
                  height: 50, width: 50, border: `1px black solid`, margin: 1
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