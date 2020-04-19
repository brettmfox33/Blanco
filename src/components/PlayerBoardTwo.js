/** @jsx jsx */
import {jsx} from "@emotion/core";
import PlayerBoard from "./game_pieces/player_board/PlayerBoard";

export default function PlayerBoardTwo() {
  return (
    <div
      id="playerBoardTwo"
      css={{
        gridArea: 'playerBoardTwo',
        display: 'flex'
      }}
    >
      <PlayerBoard
        playerNumber={2}
      />
    </div>
  )
}