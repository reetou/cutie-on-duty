// Reducers
import {
  CALL_MOB, HIT_MOB,
  GAME_OVER, MOB_READY,
  UNHIT_MOB, MOVE_MOB,
  START_GAME
} from '../actions'

function rootReducer(state = {
  gameStarted: false,
  chosenMob: 'nobody',
  alive: false,
  score: 0,
  gameOver: false,
  needNewCall: true,
  readyForDeath: false,
  receivedAt: Date.now(),
  levelBackground: 'standard-better',
  step: 0,
  showDead: 'none',
  hit: 'unarmed'
}, action) {
  switch (action.type) {
    case MOB_READY:
      return Object.assign({}, state, {
        readyForDeath: true,
        mobQuote: 'Пощады!'
      });
    case CALL_MOB:
      return Object.assign({}, state, {
        gameStarted: true,
        hit: 'prepared',
        needNewCall: false,
        chosenMob: action.mob,
        alive: true,
        readyForDeath: false,
        gameOver: false,
        showDead: 'block',
        mobQuote: 'Сразимся в честном поединке!'
      });
    case HIT_MOB: 
      return Object.assign({}, state, {
        alive: false,
        needNewCall: false,
        hit: 'hit',
        readyForDeath: false,
        score: state.score + 1,
        chosenMob: state.chosenMob + '-dead'
      });
    case UNHIT_MOB:
      return Object.assign({}, state, {
        needNewCall: true,
        step: 0,
        showDead: 'none',
        hit: 'prepared'
      });
    case START_GAME:
      return Object.assign({}, state, {
        gameOver: false,
        step: 0
      });
    case GAME_OVER:
      return Object.assign({}, state, {
        alive: false,
        gameOver: true,
        finishedAt: action.receivedAt,
        chosenMob: 'nobody',
        score: 0,
        needNewCall: true,
        readyForDeath: false,
        step: 0,
        showDead: 'none',
        mobQuote: '',
        hit: 'unarmed'
      });
    case MOVE_MOB:
      return Object.assign({}, state, {
        step: state.step + action.stepLength
      });
    default:
      return state
  }
}

export default rootReducer