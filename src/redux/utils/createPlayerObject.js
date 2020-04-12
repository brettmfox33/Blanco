/**
 * Create an initial player object for the state
 **/
export default function createPlayerObject(actionPayload) {
  const playerObj = {
    1: {
      playerName: actionPayload.playerName
    }
  };
  for (let i=1; i<actionPayload.numberOfPlayers; i++) {
    playerObj[i+1] = null
  }
  return playerObj
}