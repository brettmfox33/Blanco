/** @jsx jsx */
import {jsx} from "@emotion/core";
import PlayerBoard from "./game_pieces/player_board/PlayerBoard";

export default function PlayerBoardOne({socket}) {
  return (
    <div
      id="playerBoardOne"
      css={{
        gridArea: 'playerBoardOne',
        display: 'flex'
      }}
    >
      <PlayerBoard
        playerNumber={1}
        socket={socket}
      />
    </div>
  )
}