/** @jsx jsx */
import {useSelector} from "react-redux";
import {jsx} from "@emotion/core";

export default function Main() {
  const state = useSelector(state => state);
  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
}