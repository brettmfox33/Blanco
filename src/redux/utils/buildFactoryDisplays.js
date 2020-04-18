import randomNumber from "../../utils/getRandomInteger"

export default function buildFactoryDisplays(state, action) {
  const numberOfFactoryDisplays = 5 + ((action.payload.numberOfPlayers - 2) * 2);

  // Generate initial factory displays
  const factoryDisplays = [];
  for(let i=0; i<numberOfFactoryDisplays; i++){
    factoryDisplays.push({
      "tiles":{
        "black": 0,
        "blue": 0,
        "red": 0,
        "yellow": 0,
        "white": 0
      }
    })
  }

  // Build a list of objects out of tiles remaining in the bag
  let tiles = [];
  Object.keys(state.gameState.availableTiles).map(color => {
    Array.from({length: state.gameState.availableTiles[color]}, (_, index) => {
      tiles.push({"color": color})
    })
  });

  // Use the tile array to grab random tile objects to assign to factory displays
  factoryDisplays.map(factoryDisplay => {
    for(let i=0; i<4; i++){
      //We may have a bug in the random number, needs to be 0-99
      // Getting error: Uncaught TypeError: Cannot read property 'color' of undefined
      const daRandomNumber = randomNumber(0, tiles.length);
      const tileColor = tiles.splice(daRandomNumber, 1)[0].color;
      state.gameState.availableTiles[tileColor] = state.gameState.availableTiles[tileColor] - 1;
      factoryDisplay["tiles"][tileColor] = factoryDisplay["tiles"][tileColor] + 1;
    }
  });

  return factoryDisplays
}