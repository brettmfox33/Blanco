export default function calculateScore(state) {
  const newPlayers = {...state.players};
  const newGameState = {...state.gameState};

  Object.keys(newPlayers).map(playerIndex => {
    const playerObj = newPlayers[playerIndex];
    const playerBoard = playerObj.board;
    let roundScore = 0;
    Object.keys(playerBoard.patternLines).map(patternLineIndex => {
      const patternLine = playerBoard.patternLines[patternLineIndex];
      const filledTiles = Object.values(patternLine).filter(item => item !== null);

      // If pattern line is full then add it to the wall, remove from tiles from pattern line
      // and add them to the box.
      if (filledTiles.length - 1 === parseInt(patternLineIndex)) {
        const filledColor = filledTiles[0];
        // Add tile to wall
        playerBoard.wall[patternLineIndex][filledColor] = true;
        // Add tiles to box
        newGameState.boxTiles[filledColor] = parseInt((newGameState.boxTiles[filledColor] + patternLineIndex));
        // Remove tiles from pattern line
        Object.keys(patternLine).map(patternLineIndex => {
          patternLine[patternLineIndex] = null
        });

        // Calculate Wall Score
        const wallLine = playerBoard.wall[patternLineIndex];
        const wallLineIndex = Object.keys(wallLine).indexOf(filledColor);
        const horizontalArray = Object.values(wallLine);

        // Check if the array is full. This means the game is over.
        newGameState.gameOver = (horizontalArray.filter(item=> item !== null).length === 5);

        let verticalArray = [];
        Object.keys(playerBoard.wall).map(wallIndex => {
          verticalArray.push(Object.values(playerBoard.wall[wallIndex])[wallLineIndex])
        });

        // If we are counting both vertical and horizontal than the base tile is counted twice
        if ((horizontalArray[wallLineIndex - 1] || horizontalArray[wallLineIndex + 1])
          &&
          (verticalArray[parseInt(patternLineIndex) - 1] || verticalArray[parseInt(patternLineIndex) + 1])
        ) {
          roundScore = roundScore + 2;
        }
        else {
          roundScore = roundScore + 1;
        }

        // Adjacent Horizontal Left
        for (let i=wallLineIndex-1; horizontalArray[i]; i--){
          roundScore = roundScore + 1;
        }
        // Adjacent Horizontal Left
        for (let i=wallLineIndex+1; horizontalArray[i]; i++){
          roundScore = roundScore + 1;
        }

        // Adjacent Vertical Up
        for (let i=parseInt(patternLineIndex)-1; verticalArray[i]; i--){
          roundScore = roundScore + 1;
        }
        // Adjacent Vertical Down
        for (let i=parseInt(patternLineIndex)+1; verticalArray[i]; i++){
          roundScore = roundScore + 1;
        }
      }
    });

    // Loop through Penalty Tiles. Add penalty to score, add tile to box, and remove tile from floor line
    Object.keys(playerBoard.floorLine).map(floorLineIndex => {
      const floorLineTile = playerBoard.floorLine[floorLineIndex];
      if (floorLineTile.color){
        // Add the penalty to the total score
        roundScore = roundScore + floorLineTile.penalty;
        newGameState.boxTiles[floorLineTile.color] = parseInt(newGameState.boxTiles[floorLineTile.color] + 1);
        floorLineTile.color = null
      }
    });

    // Add Round score to total score
    playerObj.score = playerObj.score + roundScore;

    // Add player 1 tile back to center
    newGameState.overflowTiles.firstPlayerToken = 1;
  });

  return [newPlayers, newGameState]
}