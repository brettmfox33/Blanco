/**
 * Create an initial player object for the state
 **/
export default function createPlayerObject(actionPayload) {
  const playerObj = {
    playerName: null,
    board: {
      patternLines: {
        0: {
          0: null
        },
        1: {
          0: null,
          1: null
        },
        2: {
          0: null,
          1: null,
          2: null
        },
        3: {
          0: null,
          1: null,
          2: null,
          3: null
        },
        4: {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null
        }
      },
      wall: {
        0: {
          blue: false,
          yellow: false,
          red: false,
          black: false,
          gray: false
        },
        1: {
          gray: false,
          blue: true,
          yellow: false,
          red: false,
          black: false
        },
        2: {
          black: false,
          gray: false,
          blue: false,
          yellow: false,
          red: false
        },
        3: {
          red: false,
          black: false,
          gray: true,
          blue: false,
          yellow: false,
        },
        4: {
          yellow: false,
          red: false,
          black: false,
          gray: false,
          blue: false
        }
      }
    }
  };

  const finalPlayerObj = {};
  for (let i=1; i<actionPayload.numberOfPlayers + 1; i++) {
    finalPlayerObj[i] = {
      ...playerObj,
      playerName: i === 1 ? actionPayload.playerName : null
    }
  }
  return finalPlayerObj
}