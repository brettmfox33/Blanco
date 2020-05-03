/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function WallSquare({color, filled}) {
  return (
      <img
        alt={`${color} Tile`}
        draggable={false}
        src={require(`../../../images/tiles/${color}.png`)}
        css={[
          {height: 50, width: 50, border: '1px black solid', margin: 1, borderStyle: 'inset'},
          filled ? null : {opacity: 0.4}
        ]}
      >
      </img>
  )
}