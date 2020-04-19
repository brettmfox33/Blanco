/** @jsx jsx */
import {jsx} from "@emotion/core";
import {Fragment} from "react";

export default function FactoryDisplay({tiles}) {

  const hardCodedPoints = [
    [45, 50],
    [100, 50],
    [45, 105],
    [100, 105]
  ];
  let tileNumber = 0;

  return (
    <Fragment>
      <div css={{position: 'relative'}}>
        <img
          alt="factoryTile"
          src={require(`../../images/FactoryTile.png`)}
          css={{position: 'relative'}}
        />
        {
          Object.keys(tiles).map(color => {
            return(
              Array.from({length: tiles[color]}, (_, index) => {
                const x = hardCodedPoints[tileNumber][0];
                const y = hardCodedPoints[tileNumber][1];
                tileNumber = tileNumber + 1;
                // const rotateTurn = getRandomInteger(0, 10) / 10;
                return (
                  <img
                    key={`tile-${x}-${y}`}
                    alt={`${color} Tile`}
                    src={require(`../../images/tiles/${color}.png`)}
                    css={{border: '1px solid black', position: 'absolute',
                      left: x, top: y}}
                      // rotate:`${rotateTurn}turn`}}
                  />
                )
              })
            )
          })
        }
      </div>
    </Fragment>
  )
}