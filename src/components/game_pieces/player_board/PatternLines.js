/** @jsx jsx */
import {jsx} from "@emotion/core";
import PatternLine from "./PatternLine";

export default function PatternLines({socket, playerNumber, playerBoard}) {
  const patternLines = playerBoard.patternLines;


  return (
    Object.keys(patternLines).map(patternRowIndex => {
      return (
        <PatternLine
          key={`${playerNumber}-${patternRowIndex}`}
          socket={socket}
          playerBoard={playerBoard}
          patternLines={patternLines}
          patternRowIndex={patternRowIndex}
          playerNumber={playerNumber}
        />
      )
    })
  )}