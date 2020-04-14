/** @jsx jsx */
import {jsx, css} from "@emotion/core";
import FactoryDisplays from "./FactoryDisplays";
import PlayerBoardLeft from "./PlayerBoardLeft";
import Overflow from "./Overflow";
import PlayerBoardRight from "./PlayerBoardRight";
import {useSelector} from "react-redux";

const styles = {
  app: css({
    display: 'grid',
    minHeight: '100vh',
    gridTemplateRows: '220px 800px',
    gridTemplateColumns: '700px 400px 700px',
    gridTemplateAreas: `
        "factoryDisplays factoryDisplays factoryDisplays"
        "playerBoardLeft overflow playerBoardRight"
        "playerBoardLeft overflow playerBoardRight"
        `
  })
};

export default function GameBoard() {
  const players = useSelector(state => state.players);
  const numberOfPlayers = useSelector(state => state.numberOfPlayers);

  return (
    players && Object.values(players).filter(item => item).length === numberOfPlayers
      ? <div css={styles.app}>
          <FactoryDisplays />
          <PlayerBoardLeft />
          <PlayerBoardRight />
          <Overflow/>
        </div>
      : null
  )
};
