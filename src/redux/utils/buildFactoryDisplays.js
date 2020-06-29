import randomNumber from "../../utils/getRandomInteger"

export default function buildFactoryDisplays(state, numberOfPlayers) {
  const numberOfFactoryDisplays = 5 + ((numberOfPlayers - 2) * 2);
  let numberOfTilesNeeded = numberOfFactoryDisplays * 4;

  const buildTileObjects = () => {
    // Build a list of objects out of tiles remaining in the bag
    let tiles = [];
    Object.keys(state.gameState.availableTiles).map(color => {
      Array.from({length: state.gameState.availableTiles[color]}, (_, index) => {
        tiles.push({"color": color})
      })
    });
    return tiles;
  };

  // Generate initial factory displays
  const factoryDisplays = [];
  for(let i=0; i<numberOfFactoryDisplays; i++){
    factoryDisplays.push({
      "tiles":{
        "black": 0,
        "blue": 0,
        "red": 0,
        "yellow": 0,
        "purple": 0
      }
    })
  }

  let tileObjs = buildTileObjects();

  // Use the tile array to grab random tile objects to assign to factory displays
  factoryDisplays.map(factoryDisplay => {
    for(let i=0; i<4; i++){
      // If we are out of tiles to put in factory displays then move the tiles from
      // the box to the bag and continue distribution.
      if (tileObjs.length === 0) {
        const tempBag = {...state.gameState.availableTiles};
        state.gameState.availableTiles = {...state.gameState.boxTiles};
        state.gameState.boxTiles = {...tempBag};
        tileObjs = buildTileObjects()
      }
      
      if (tileObjs.length === 0) {
        return factoryDisplays
      }
      
      const randomNum = randomNumber(0, tileObjs.length - 1);
      const tileColor = tileObjs.splice(randomNum, 1)[0].color;

      state.gameState.availableTiles[tileColor] = state.gameState.availableTiles[tileColor] - 1;
      factoryDisplay["tiles"][tileColor] = factoryDisplay["tiles"][tileColor] + 1;
      numberOfTilesNeeded = numberOfTilesNeeded - 1;
    }
  });

  return factoryDisplays
}