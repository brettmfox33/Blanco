/** @jsx jsx */
import {jsx} from "@emotion/core";
import PlayerBoard from "./game_pieces/player_board/PlayerBoard";
import {useSelector} from "react-redux";

export default function PlayerBoardFour() {
  const numberOfPlayers = useSelector(state => state.public.numberOfPlayers);

  return (
    <div
      id="playerBoardFour"
      css={{
        gridArea: 'playerBoardFour',
        display: 'flex'
      }}
    >
      {
        numberOfPlayers === 4
          ? <PlayerBoard
            playerNumber={4}
          />
          : null
      }
    </div>
  )
}