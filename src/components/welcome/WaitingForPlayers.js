/** @jsx jsx */

import DialogContentText from "@material-ui/core/DialogContentText";
import {jsx} from "@emotion/core";
import {useSelector} from "react-redux";

export default function WaitingForPlayers() {
  const players = useSelector(state => state.public.players);
  const roomID = useSelector(state => state.public.roomID);

  return(
    <div id="waiting-for-players">
      <DialogContentText
        css={{justifyContent: "center", alignItems: "center", display: "grid"}}
      >
        Waiting for players. Share the following room code for others to join: {roomID}
      </DialogContentText>
      <div>
        {Object.keys(players).map((key, index) => (
          <p key={index+1}>
            {
              players[index+1].playerName
                ? `Player ${index+1}: ${players[index+1].playerName}`
                : `Player ${index+1}: `
            }
          </p>
        ))}
      </div>
    </div>
  )
}