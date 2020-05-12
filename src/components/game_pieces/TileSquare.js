/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function TileSquare({color, borderColor, onDragOver, onDrop, onDragLeave, patternLine}) {

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

  return (
      <img
        draggable={false}
        alt="Tile Square"
        src={require(`../../images/tiles/${color}.png`)}
        css={
          [
            {height: height, width: width, border:`${borderSize}px ${borderColor} solid`, margin: 1, borderStyle: 'inset'},
            color === 'white' ? {opacity: 0.7} : null
          ]
        }
        onDragOver={(event) => onDragOver(event, patternLine)}
        onDrop={(event) => onDrop(event)}
        onDragLeave={(event) => onDragLeave()}
      >
      </img>
  )
}