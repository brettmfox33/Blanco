/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function TileSquare() {
  return (
      <img
        alt="whiteTile"
        src={require(`../../images/tiles/white.png`)}
        css={{border:'1px black solid'}}
      >
      </img>
  )
}