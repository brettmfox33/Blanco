/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function WallSquare({color, filled}) {
  return (
      <img
        alt={`${color} Tile`}
        src={require(`../../../images/tiles/${color}.png`)}
        css={[
          {border: '1px black solid'},
          filled ? null : {opacity: 0.3}
          ]}
      >
      </img>
  )
}