/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function FloorLineTile({borderColor, penaltyAmount, tileColor}) {
  let height = 50;
  let width = 50;
  let borderSize = 1;

  if (borderColor !== 'black'){
    height = 48;
    width = 48;
    borderSize = 2
  }

  return (
    <div css={{marginRight: 1, marginLeft: 1}}>
      <div
        css={{
          border: `1px black solid`, backgroundColor: '#a7a7a7',
          display: "flex", justifyContent: "center", fontSize:12}}
      >
        {penaltyAmount}
      </div>
      <img
        draggable={false}
        alt="whiteTile"
        src={require(`../../../images/tiles/${tileColor}.png`)}
        css={
          [
            {height: height, width: width, border:`${borderSize}px ${borderColor} solid`, borderStyle: 'inset'},
            tileColor === 'white' ? {opacity: 0.7} : null
          ]
        }
      >
      </img>
    </div>
  )
}