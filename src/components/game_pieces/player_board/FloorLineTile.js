/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function FloorLineTile({borderColor, penaltyAmount, tileColor}) {
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
        alt="whiteTile"
        src={require(`../../../images/tiles/${tileColor}.png`)}
        css={
          [
            {height: 50, width: 50, border:`1px ${borderColor} solid`, borderStyle: 'inset'},
            tileColor === 'white' ? {opacity: 0.7} : null
          ]
        }
      >
      </img>
    </div>
  )
}