import { handleActions } from "redux-actions";
import {actionCreators} from "../actionCreators";
import getRandomInteger from "../../utils/getRandomInteger";
import createPlayerObject from "../utils/createPlayerObject";
import buildFactoryDisplays from "../utils/buildFactoryDisplays";
import calculateScore from "../utils/calculateScore";
import calculateBonusScores from "../utils/calculateBonusScores";

const initialState = {
  roomID: null,
  numberOfPlayers: null,
  players: null,
  currentPlayerTurn: null,
  disconnected: false,
  gameState: {
    nextRoundFirstPlayer: null,
    roundTiles: null,
    gameOver: false,
    availableTiles: {
      black: 20,
      blue: 20,
      red: 20,
      purple: 20,
      yellow: 20
    },
    boxTiles: {
      black: 0,
      blue: 0,
      red: 0,
      purple:0,
      yellow: 0,
    },
    overflowX: null,
    overflowY: null,
    overflowTiles: {
      black: 0,
      blue: 0,
      red: 0,
      purple: 0,
      yellow: 0,
      firstPlayerToken: 1,
    },
    factoryDisplays: null,
    endGameStats: {
      winners: [],
      winningScore: null,
    },
  },
  dragState: {
    dragState: null,
    tileColor: null,
    tileCount: null,
    factoryDisplay: null,
    fromCenter: false,
    hoveredPatternLine: null,
    originX: null,
    originY: null
  },
  endTurnAnimation: {
    destinationX: null,
    destinationY: null,
    factoryDisplay: null,
    overflow: null,
    color: null
  },
  endRoundAnimations: {
    animate: false,
    pendingAnimations: 0,
    players: {}
  },
  gameChat: [{playerName:'Brett',message:'Hey'}, {playerName:'Adam',message:"What's up?"}, {playerName:'Brett',message:'N2m'}]
};

export default handleActions(
  {
    /** Game State **/
    [actionCreators.public.createGame]: (state, action) => {
      const numberOfPlayers = action.payload.numberOfPlayers;
      const factoryDisplays = buildFactoryDisplays(state, numberOfPlayers);

      const endRoundAnimationsPlayers = {...state.endRoundAnimations.players};
      for (let i=0; i<numberOfPlayers; i++) {
        endRoundAnimationsPlayers[i+1] = []
      }

      return {
        ...state,
        roomID: getRandomInteger(1000, 9000),
        numberOfPlayers: action.payload.numberOfPlayers,
        players: createPlayerObject(action.payload),
        gameState: {
          ...state.gameState,
          factoryDisplays: factoryDisplays,
          roundTiles: Object.keys(factoryDisplays).length * 4
        },
        endRoundAnimations: {
          ...state.endRoundAnimations,
          players: endRoundAnimationsPlayers
        }
      }
    },
    [actionCreators.public.setFirstPlayer]: (state, action) => ({
      ...state,
      currentPlayerTurn: action.payload.playerNumber
    }),
    [actionCreators.public.updatePublicState]: (state, action) => {
      return action.payload.newPublicState
    },
    [actionCreators.public.changeTurn]: (state, action) => ({
      ...state,
      currentPlayerTurn: action.payload.newCurrentTurn
    }),
    /** End Round State **/
    [actionCreators.public.calculateScore]: state => {
      let factoryDisplays = {...state.gameState.factoryDisplays};

      // Calculate Score
      const [newPlayers, newGameState] = calculateScore(state);

      const newState = {
        ...state,
        gameState: newGameState,
        players: newPlayers
      };

      // Redistribute tiles to factory displays
      if (!newGameState.gameOver) {
        factoryDisplays = buildFactoryDisplays(newState, state.numberOfPlayers);
      }

      // Reset end round animations
      const endRoundAnimations = {
        ...state.endRoundAnimations,
        animate: false,
        animationFinished: false,
        color: null,
      };

      for (let i=0; i<state.numberOfPlayers; i++) {
        endRoundAnimations.players[i+1] = []
      }

      return {
        ...state,
        players: {
          ...newPlayers
        },
        gameState: {
          ...newGameState,
          factoryDisplays: factoryDisplays,
          roundTiles: Object.keys(factoryDisplays).length * 4,
          nextRoundFirstPlayer: null
        },
        endRoundAnimations: endRoundAnimations
      }
    },
    /** End Game State **/
    [actionCreators.public.endGame]: state => {
      const players = calculateBonusScores(state);

      // Determine the winner(s)
      let topScore = null;
      const winnerObjs = [];

      Object.values(players).map(playerObject => {

        if (!topScore) {
          winnerObjs.push(playerObject);
          topScore = playerObject.score;
        }
        else if (playerObject.score >= topScore) {
          winnerObjs.push(playerObject);
          topScore = playerObject.score;
        }
      });

      const winners = [];
      let topHorizontalLines = 1;

      if (winnerObjs.length >= 1) {
        winnerObjs.map(winnerObj => {
          if (winnerObj.completedHorizontalLines >= topHorizontalLines) {
            winners.push(winnerObj.playerName);
            topHorizontalLines = winnerObj.completedHorizontalLines;
          }
        })
      }

      return {
        ...state,
        players: players,
        gameState: {
          ...state.gameState,
          endGameStats: {
            ...state.endGameStats,
            winners: winners,
            winningScore: topScore
          }
        },
      }
    },
    /** Drag State **/
    [actionCreators.public.dragStart]: (state, action) => {
      let tileCount;
      if (action.payload.factoryDisplay){
        tileCount = state.gameState.factoryDisplays[action.payload.factoryDisplay].tiles[action.payload.tileColor]
      }
      else {
        tileCount = state.gameState.overflowTiles[action.payload.tileColor]
      }
      return {
        ...state,
        dragState: {
          ...state.dragState,
          dragState: 'dragging',
          factoryDisplay: action.payload.factoryDisplay ? action.payload.factoryDisplay : null,
          fromCenter: !action.payload.factoryDisplay,
          tileColor: action.payload.tileColor,
          tileCount: tileCount,
          originX: action.payload.originX,
          originY: action.payload.originY

        }
      }
    },
    [actionCreators.public.dropTile]: (state, action) => {
      const tileColor = state.dragState.tileColor;
      const endRoundAnimations = state.endRoundAnimations.players[action.payload.playerNumber];

      // Move the dragged tiles to the Pattern Line
      const patternLine = state.players[action.payload.playerNumber].board.patternLines[action.payload.patternRowIndex];
      let tileCount = state.dragState.tileCount;
      Object.keys(patternLine).map(patternLineIndex => {
        if (!patternLine[patternLineIndex] && tileCount) {
          patternLine[patternLineIndex]=tileColor;
          --tileCount;
        }
      });

      // If the pattern line is full then add it to the end round animations
      if (Object.keys(patternLine).length === Object.values(patternLine).filter(item => item).length) {
        endRoundAnimations.push(action.payload.patternRowIndex);
        state.endRoundAnimations.pendingAnimations = state.endRoundAnimations.pendingAnimations + 1;
      }

      // Add left over dragged tiles to the Floor Line
      const floorLine = {...state.players[action.payload.playerNumber].board.floorLine};
      const boxTiles = {...state.gameState.boxTiles};
      if (tileCount) {
        Object.keys(floorLine).map(floorLineIndex => {
          if (tileCount && !floorLine[floorLineIndex].color) {
            floorLine[floorLineIndex].color = tileColor;
            --tileCount;
          }
        });
        // If the floor line is full and tiles still remain then add them to the box
        if (tileCount) {
          boxTiles[tileColor] = boxTiles[tileColor] + tileCount
        }
      }

      const factoryDisplays = {...state.gameState.factoryDisplays};
      const overflowTiles = {...state.gameState.overflowTiles};

      if (action.payload.location === 'factory') {
        // Remove the dragged tiles from the Factory Display
        // Add the left over Factory Display tiles to the Center
        factoryDisplays[state.dragState.factoryDisplay].tiles[state.dragState.tileColor] = 0;
        Object.keys(factoryDisplays[state.dragState.factoryDisplay].tiles).map(factoryTileColor => {
          overflowTiles[factoryTileColor] = overflowTiles[factoryTileColor] +
            factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor];
          factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor] = 0
        });
      }
      else {
        // Remove the dragged tiles from the overflow center.
        // If the first player token is still in the center then move it to the player's floor line.
        overflowTiles[state.dragState.tileColor] = 0;
        if (overflowTiles['firstPlayerToken']) {
          Object.keys(floorLine).map(floorLineIndex => {
            if (overflowTiles['firstPlayerToken'] && !floorLine[floorLineIndex].color) {
              floorLine[floorLineIndex].color = 'firstPlayerToken';
              state.gameState.nextRoundFirstPlayer = action.payload.playerNumber;
              overflowTiles['firstPlayerToken'] = 0;
            }
          });
        }
      }

      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.playerNumber]: {
            ...state.players[action.payload.playerNumber],
            board: {
              ...state.players[action.payload.playerNumber].board,
              patternLines: {
                ...state.players[action.payload.playerNumber].board.patternLines,
                [action.payload.patternRowIndex]: patternLine
              },
              floorLine: floorLine
            }
          }
        },
        gameState: {
          ...state.gameState,
          boxTiles: boxTiles,
          factoryDisplays: factoryDisplays,
          overflowTiles: overflowTiles,
          roundTiles: state.gameState.roundTiles - state.dragState.tileCount
        }
      }
    },
    [actionCreators.public.dropTileFloor]: (state, action) => {
      const tileColor = state.dragState.tileColor;
      let tileCount = state.dragState.tileCount;
      const newBoxTiles = {...state.gameState.boxTiles};

      // Moved the dragged tiles to the Floor Line
      const newFloorLine = {...state.players[action.payload.playerNumber].board.floorLine};
      Object.keys(newFloorLine).map(floorLineIndex => {
        if (tileCount && !newFloorLine[floorLineIndex].color) {
          newFloorLine[floorLineIndex].color = tileColor;
          --tileCount;
        }
      });

      // If the floor line is full and tiles still remain then add them to the box
      if (tileCount) {
        newBoxTiles[tileColor] = newBoxTiles[tileColor] + tileCount
      }

      const factoryDisplays = {...state.gameState.factoryDisplays};
      const overflowTiles = {...state.gameState.overflowTiles};

      if (action.payload.location === 'factory') {
        // Remove the dragged tiles from the Factory Display
        // Add the left over Factory Display tiles to the Center
        factoryDisplays[state.dragState.factoryDisplay].tiles[state.dragState.tileColor] = 0;
        Object.keys(factoryDisplays[state.dragState.factoryDisplay].tiles).map(factoryTileColor => {
          overflowTiles[factoryTileColor] = overflowTiles[factoryTileColor] +
            factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor];
          factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor] = 0
        });
      } else {
        // Remove the dragged tiles from the overflow center.
        // If the first player token is still in the center then move it to the player's floor line.
        overflowTiles[state.dragState.tileColor] = 0;
        if (overflowTiles['firstPlayerToken']) {
          Object.keys(newFloorLine).map(floorLineIndex => {
            if (overflowTiles['firstPlayerToken'] && !newFloorLine[floorLineIndex].color) {
              newFloorLine[floorLineIndex].color = 'firstPlayerToken';
              state.gameState.nextRoundFirstPlayer = action.payload.playerNumber;
              overflowTiles['firstPlayerToken'] = 0;
            }
          });
        }
      }

      let endRoundAnimationsAnimate = false;
      if (!state.gameState.roundTiles) {
        endRoundAnimationsAnimate = true
      }

      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.playerNumber]: {
            ...state.players[action.payload.playerNumber],
            board: {
              ...state.players[action.payload.playerNumber].board,
              floorLine: newFloorLine
            }
          }
        },
        gameState: {
          ...state.gameState,
          boxTiles: newBoxTiles,
          factoryDisplays: factoryDisplays,
          overflowTiles: overflowTiles,
          roundTiles: state.gameState.roundTiles - state.dragState.tileCount
        },
        endRoundAnimations: {
          ...state.endRoundAnimations,
          animate: endRoundAnimationsAnimate
        }
      }
    },
    [actionCreators.public.clearDragState]: state => ({
      ...state,
      dragState: {
        dragState: null,
        factoryDisplay: null,
        tileColor: null,
        tileCount: null,
        hoveredPatternLine: null,
        fromCenter: false,
        originX: null,
        originY: null
      }
    }),
    [actionCreators.public.setDragStateHover]: (state, action) => ({
      ...state,
      dragState: {
        ...state.dragState,
        dragState: 'hovering',
        hoveredPatternLine: action.payload.patternRowIndex
      }
    }),
    [actionCreators.public.setDragStateDrag]: state => ({
      ...state,
      dragState: {
        ...state.dragState,
        dragState: 'dragging',
        hoveredPatternLine: null
      }
    }),
    [actionCreators.public.setAnimation]: (state, action) => ({
      ...state,
      endTurnAnimation: {
        ...state.endTurnAnimation,
        destinationX: action.payload.destinationX,
        destinationY: action.payload.destinationY,
        color: state.dragState.tileColor,
        factoryDisplay: state.dragState.factoryDisplay,
        overflow: state.dragState.factoryDisplay ? null : true
      }
    }),
    [actionCreators.public.updateEndTurnAnimation]: (state, action) => ({
      ...state,
      endTurnAnimation: action.payload.endTurnAnimation
    }),
    [actionCreators.public.setEndRoundAnimations]: state => ({
      ...state,
      endRoundAnimations: {
        ...state.endRoundAnimations,
        animate: true
      }
    }),
    [actionCreators.public.setAnimatedFinished]: state => ({
      ...state,
      endRoundAnimations: {
        ...state.endRoundAnimations,
        pendingAnimations: state.endRoundAnimations.pendingAnimations - 1
      }
    }),
    [actionCreators.public.disconnect]: () => ({
      ...initialState,
      disconnected: true
    }),
    [actionCreators.public.sendMessage]: (state, action) => {
      const newGameChat = [...state.gameChat];

      newGameChat.push({
        'playerName': state.players[action.payload.playerNumber].playerName,
        'message': action.payload.message
      });
      return {
        ...state,
        gameChat: newGameChat
      }
    }
  },
  initialState
);