/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function FloorLineTile({penaltyAmount}) {
  return (
    <div>
      <div
        css={{
          border:'1px black solid', backgroundColor: '#a7a7a7',
          display: "flex", justifyContent: "center", fontSize:12}}
      >
        -{penaltyAmount}
      </div>
      <img
        alt="whiteTile"
        src={require(`../../../images/tiles/white.png`)}
        css={{border:'1px black solid'}}
      >
      </img>
    </div>
  )
}