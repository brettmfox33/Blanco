/** @jsx jsx */
import {jsx} from "@emotion/core";
import {motion} from "framer-motion"
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useState} from "react";
import {actionCreators} from "../../redux/actionCreators";

export default function TileSquare({color, borderColor, onDragOver, onDrop, onDragLeave, patternLine, playerNumber, patternRowIndex, socket, patternColumnIndex}) {
  const dispatch = useDispatch();

  const wallLine = useSelector(state => state.public.players[playerNumber].board.wall[patternRowIndex]);
  const endRoundAnimations = useSelector(state => state.public.endRoundAnimations);
  const currentTurn = useSelector(state => state.private.currentTurn);
  const infoModalShow = useSelector(state => state.public.infoModalShow);

  const [reverse, setReverse] = useState(false);

  const playerAnimations = endRoundAnimations.players[playerNumber];

  if (!color){
    color = 'white';
  }
  else {
    borderColor = 'black'
  }

  let height = 50;
  let width = 50;
  let borderSize = 1;

  if (borderColor !== 'black'){
    height = 48;
    width = 48;
    borderSize = 2
  }

  const onComplete = () => {
    if (currentTurn && !reverse) {
      dispatch(actionCreators.public.setAnimatedFinished());
    }

    if (reverse){
      setReverse(false);
    }
    else {
      setReverse(true);
    }
  };

  return (
    <Fragment>
      <div css={{position: 'relative'}}>
      <img
        draggable={false}
        alt="Background Tile Square"
        src={require(`../../images/tiles/white.png`)}
        css={
          [
            {position: 'absolute', height: height, width: width, border:`${borderSize}px ${borderColor} solid`, margin: 1, borderStyle: 'inset'},
            endRoundAnimations.animate && playerAnimations.indexOf(patternRowIndex) > -1 ? {opacity: 0.6} : color === 'white' ? {opacity: 0.6} : {opacity: 0}
          ]
        }
      >
      </img>
        <motion.div
          key={`${patternRowIndex}-${patternColumnIndex}`}
          css={[{position: 'relative', marginBottom: -4},
            patternColumnIndex === "0" && infoModalShow === false ? {zIndex: 9999} : {zIndex: 0}
          ]}
          animate={
            reverse
            ? {x: 0}
            : endRoundAnimations.animate && playerAnimations.indexOf(patternRowIndex) > -1 && patternColumnIndex === "0"
            ? {x: (Object.keys(wallLine).indexOf(color) * 53) + 94}
            : {}
          }
          transition={{ duration: 2 }}
          onAnimationComplete={onComplete}
        >
          <img
            draggable={false}
            alt="Tile Square"
            src={require(`../../images/tiles/${color}.png`)}
            css={
              [
                {height: height, width: width, border:`${borderSize}px ${borderColor} solid`, margin: 1, borderStyle: 'inset'},
                reverse ? {opacity: 0} : color === 'white' ? {opacity: 0} : null
              ]
            }
            onDragOver={(event) => onDragOver(event, patternLine)}
            onDrop={(event) => onDrop(event)}
            onDragLeave={(event) => onDragLeave()}
          >
          </img>
        </motion.div>
      </div>
    </Fragment>
  )
}