/** @jsx jsx */
import { jsx } from "@emotion/core";
import {useDispatch} from "react-redux";
import {actionCreators} from "../redux/actionCreators";

export default function TestBoi() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(actionCreators.test.changeInput(event.target.value));
  };

  return(
    <div>
        <input type="text" onChange={event => handleChange(event)} />
    </div>
  )
}