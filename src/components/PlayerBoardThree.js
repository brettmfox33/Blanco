/** @jsx jsx */
import {jsx} from "@emotion/core";
import PlayerBoard from "./game_pieces/player_board/PlayerBoard";
import {useSelector} from "react-redux";

export default function PlayerBoardThree({socket}) {
  const numberOfPlayers = useSelector(state => state.public.numberOfPlayers);

  return (
    <div
      id="playerBoardThree"
      css={{
        gridArea: 'playerBoardThree',
        display: 'flex'
      }}
    >
      {
        numberOfPlayers > 2
          ? <PlayerBoard
            playerNumber={3}
            socket={socket}
          />
          : null
      }
    </div>
  )
}