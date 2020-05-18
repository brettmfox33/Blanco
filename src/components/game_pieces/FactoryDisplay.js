/** @jsx jsx */
import {jsx} from "@emotion/core";
import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import { motion } from "framer-motion"

export default function FactoryDisplay({tiles, factoryNumber}) {
  const dispatch = useDispatch();
  const myCurrentTurn = useSelector(state => state.private.currentTurn);
  const factoryDisplays = useSelector(state => state.public.gameState.factoryDisplays);
  const endTurnAnimation = useSelector(state => state.public.endTurnAnimation);
  const pendingState = useSelector(state => state.private.pendingState);

  const [colorToHide, setColorToHide] = useState(null);
  const hardCodedPoints = [
    [45, 50], [100, 50], [45, 105], [100, 105]
  ];
  let tileNumber = 0;

  const onDragStart = (event, factoryNumber, color) => {
    if (myCurrentTurn){
      dispatch(actionCreators.public.dragStart(factoryNumber, color, event.clientX, event.clientY));
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

  const onComplete = () => {
    dispatch(actionCreators.public.updatePublicState(pendingState))
  };

  return (
    <Fragment>
      <div css={{position: 'relative'}}>
        <img
          draggable={false}
          alt="factoryTile"
          src={require(`../../images/FactoryTile.png`)}
          css={{position: 'relative', zIndex: -1}}
        />
        {
          Object.keys(tiles).map(color => {
            return(
              Array.from({length: tiles[color]}, (_, index) => {
                const x = hardCodedPoints[tileNumber][0];
                const y = hardCodedPoints[tileNumber][1];
                tileNumber = tileNumber + 1;
                return (
                  <motion.div
                    key={factoryNumber+color+tileNumber}
                    animate={endTurnAnimation.color === color && endTurnAnimation.factoryDisplay === factoryNumber
                      ? {x: endTurnAnimation.destinationX, y: endTurnAnimation.destinationY}
                      : {}
                    }
                    onAnimationComplete={onComplete}
                    transition={{ duration: 1 }}
                    css={[{position: 'absolute', height: 50, width: 50,  border: '1px solid black', left: x, top: y},
                      endTurnAnimation.color === color && endTurnAnimation.factoryDisplay === factoryNumber ? {zIndex: 3} : {zIndex:1}
                    ]}
                  >
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
                          zIndex: 2, position: 'relative', height: 50, width: 50, border: '1px solid black', pointerEvents: null
                        },
                        color === colorToHide ? {opacity: .7} : null,
                        myCurrentTurn ? {cursor: 'move'} : null,
                      ]}
                    />
                  </motion.div>
                )
              })
            )
          })
        }
      </div>
    </Fragment>
  )
}