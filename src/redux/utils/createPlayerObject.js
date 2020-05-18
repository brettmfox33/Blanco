/**
 * Create an initial player object for the state
 **/
export default function createPlayerObject(actionPayload) {
  const playerObj = {
    playerName: null,
    score: 0,
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
          yellow: true,
          red: true,
          black: true,
          purple: true
        },
        1: {
          purple: false,
          blue: true,
          yellow: true,
          red: true,
          black: true
        },
        2: {
          black: false,
          purple: false,
          blue: false,
          yellow: false,
          red: false
        },
        3: {
          red: false,
          black: false,
          purple: false,
          blue: false,
          yellow: false,
        },
        4: {
          yellow: false,
          red: false,
          black: false,
          purple: false,
          blue: false
        }
      },
      floorLine: {
        0: {
          penalty: -1,
          color: null
        },
        1: {
          penalty: -1,
          color: null
        },
        2: {
          penalty: -2,
          color: null
        },
        3: {
          penalty: -2,
          color: null
        },
        4: {
          penalty: -2,
          color: null
        },
        5: {
          penalty: -3,
          color: null
        },
        6: {
          penalty: -3,
          color: null
        },
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