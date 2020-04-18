/** @jsx jsx */

import DialogContentText from "@material-ui/core/DialogContentText";
import {jsx} from "@emotion/core";
import {useSelector} from "react-redux";

export default function WaitingForPlayers() {

  const players = useSelector(state => state.public.players);

  return(
    <div id="waiting-for-players">
      <DialogContentText>
        Waiting for players to join game...
      </DialogContentText>
      <div>
        {Object.keys(players).map((key, index) => (
          <p key={index+1}>
            {
              players[index+1]
                ? `Player ${index+1}: ${players[index+1].playerName}`
                : `Player ${index+1}: `
            }
          </p>
        ))}
      </div>
    </div>
  )
}