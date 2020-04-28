/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function TileSquare({color, borderColor, onDragOver, onDrop, onDragLeave, patternLine}) {

  if (!color){
    color = 'white';
  }
  else {
    borderColor = 'black'
  }



  return (
      <img
        draggable={false}
        alt="Tile Square"
        src={require(`../../images/tiles/${color}.png`)}
        css={{border:`1px ${borderColor} solid`, margin: 1}}
        onDragOver={(event) => onDragOver(event, patternLine)}
        onDrop={(event) => onDrop(event)}
        onDragLeave={(event) => onDragLeave()}
      >
      </img>
  )
}