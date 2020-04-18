/** @jsx jsx */
import {jsx, css} from "@emotion/core";
import FactoryDisplays from "./FactoryDisplays";
import PlayerBoardOne from "./PlayerBoardOne";
import Overflow from "./Overflow";
import PlayerBoardTwo from "./PlayerBoardTwo";
import {useSelector} from "react-redux";
import PlayerBoardThree from "./PlayerBoardThree";
import PlayerBoardFour from "./PlayerBoardFour";
const styles = {
  app: css({
    display: 'grid',
    minHeight: '100vh',
    gridTemplateRows: '220px 400px 400px',
    gridTemplateColumns: '700px 400px 700px',
    gridTemplateAreas: `
        "factoryDisplays factoryDisplays factoryDisplays"
        "playerBoardOne overflow playerBoardTwo"
        "playerBoardThree overflow playerBoardFour"
        `
  })
};

export default function GameBoard() {
  const players = useSelector(state => state.public.players);
  const numberOfPlayers = useSelector(state => state.public.numberOfPlayers);

  return (
    players && Object.values(players).filter(item => item).length === numberOfPlayers
      ? <div css={styles.app}>
          <FactoryDisplays />
          <PlayerBoardOne />
          <PlayerBoardTwo />
          <PlayerBoardThree />
          <PlayerBoardFour />
          <Overflow/>
        </div>
      : null
  )
};
