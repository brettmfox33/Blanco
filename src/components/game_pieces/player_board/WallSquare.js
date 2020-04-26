/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function WallSquare({color, filled}) {
  return (
      <img
        alt={`${color} Tile`}
        draggable={false}
        src={require(`../../../images/tiles/${color}.png`)}
        css={[
          {border: '1px black solid', margin: 1},
          filled ? null : {opacity: 0.4}
        ]}
      >
      </img>
  )
}