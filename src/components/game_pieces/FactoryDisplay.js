/** @jsx jsx */
import {jsx} from "@emotion/core";
import {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";

export default function FactoryDisplay({tiles, factoryNumber}) {
  const dispatch = useDispatch();
  const myCurrentTurn = useSelector(state => state.private.currentTurn);
  const factoryDisplays = useSelector(state => state.public.gameState.factoryDisplays);

  const [colorToHide, setColorToHide] = useState(null);
  const hardCodedPoints = [
    [45, 50],
    [100, 50],
    [45, 105],
    [100, 105]
  ];
  let tileNumber = 0;

  const onDragStart = (event, factoryNumber, color) => {
    if (myCurrentTurn){
      dispatch(actionCreators.public.dragStart(factoryNumber, color));

      // Set the drag image
      let tileCount = factoryDisplays[factoryNumber].tiles[color];
      if (tileCount > 5) {
        tileCount = 5
      }

      let dragImage = new Image();
      dragImage.src = require(`../../images/tiles/ghost/${tileCount}/${color}.png`);
      event.dataTransfer.setDragImage(dragImage,25,25);

      // Set the colors to hide in the factory display
      setColorToHide(color);
    }
  };

  const onDragEnd = (event) => {
    if (myCurrentTurn) {
      dispatch(actionCreators.public.clearDragState());
      // Show the colors back in the factory display
      setColorToHide(null);
    }
  };

  return (
    <Fragment>
      <div css={{position: 'relative'}}>
        <img
          draggable={false}
          alt="factoryTile"
          src={require(`../../images/FactoryTile.png`)}
          css={{position: 'relative'}}
        />
        {
          Object.keys(tiles).map(color => {
            return(
              Array.from({length: tiles[color]}, (_, index) => {
                const x = hardCodedPoints[tileNumber][0];
                const y = hardCodedPoints[tileNumber][1];
                tileNumber = tileNumber + 1;
                // const rotateTurn = getRandomInteger(0, 10) / 10;
                return (
                    <img
                      id={`factoryTile-${factoryNumber}-${color}`}
                      onDragStart={(event) => onDragStart(event, factoryNumber, color)}
                      onDragEnd={(event) => onDragEnd(event)}
                      key={`tile-${x}-${y}`}
                      alt={`${color} Tile`}
                      src={require(`../../images/tiles/${color}.png`)}
                      draggable={myCurrentTurn}
                      css={[
                        {
                          height: 50, width: 50, border: '1px solid black', position: 'absolute', pointerEvents: null,
                          left: x, top: y
                        },
                        color === colorToHide ? {opacity: .7} : null,
                        myCurrentTurn ? {cursor: 'move'} : null
                      ]}
                      // rotate:`${rotateTurn}turn`}}
                    />
                )
              })
            )
          })
        }
      </div>
    </Fragment>
  )
}