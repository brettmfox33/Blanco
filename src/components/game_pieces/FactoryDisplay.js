/** @jsx jsx */
import {jsx} from "@emotion/core";

export default function FactoryDisplay({displayNumber}) {
  return (
      <img
        id={`factoryTile-${displayNumber}`}
        alt="factoryTile"
        src={require(`../../images/FactoryTile.png`)}
      >
      </img>
  )
}