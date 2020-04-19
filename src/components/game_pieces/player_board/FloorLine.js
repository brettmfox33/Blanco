/** @jsx jsx */
import {jsx} from "@emotion/core";
import FloorLineTile from "./FloorLineTile";

const penalties = [1, 1, 2, 2, 2, 3, 3];
export default function FloorLine() {
  return (
    Array.from({length: 7}, (_, index) => {
       return (
         <FloorLineTile
           penaltyAmount={penalties[index]}
         />
       )
    })
  )
}