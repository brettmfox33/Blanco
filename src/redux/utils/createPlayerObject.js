/**
 * Create an initial player object for the state
 **/
export default function createPlayerObject(numberOfPlayers) {
  const playerObj = {};
  for (let i=0; i<numberOfPlayers; i++) {
    playerObj[i+1] = null
  }
  return playerObj
}