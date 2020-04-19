/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function TileSquare({color}) {
  if (!color){
    color = 'white'
  }
  
  return (
      <img
        alt="Tile Square"
        src={require(`../../images/tiles/${color}.png`)}
        css={{border:'1px black solid', margin: 1}}
      >
      </img>
  )
}