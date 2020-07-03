export default function calculateBonusScores(newPlayers) {
  // const newPlayers = {...state.players};

  Object.keys(newPlayers).map(playerNumber => {
    const playerObj = newPlayers[playerNumber];
    const wall = playerObj.board.wall;
    let bonusScore = 0;

    const colors = {
      blue: 0,
      yellow: 0,
      red: 0,
      black: 0,
      purple: 0
    };
    // Check if any rows are completed
    Object.values(wall).map(wallObj => {
      if (Object.values(wallObj).filter(item => item === true).length === 5) {
        bonusScore = bonusScore + 2
      }
      Object.keys(colors).map(color => {
        if (wallObj[color]){
          colors[color] = colors[color] + 1
        }
      });
    });

    // Check if any columns are completed
    Array.from({length: 5}, (_, index) => {
      let verticalArray = [];
      Object.keys(wall).map(wallIndex => {
        verticalArray.push(Object.values(wall[wallIndex])[index])
      });

      if (verticalArray.filter(item => item === true).length === 5) {
        bonusScore = bonusScore + 7
      }
    });

    // Check if for every color all 5 tiles of that color is places on the wall
    Object.values(colors).map(colorAmount => {
      if (colorAmount === 5) {
        bonusScore = bonusScore + 10
      }
    });
    playerObj.score = playerObj.score + bonusScore
  });
  return newPlayers
}