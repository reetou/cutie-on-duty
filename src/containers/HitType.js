import { HIT_MOB, REWRITE_SCORE, CALL_MOB, GAME_OVER, MOB_ISDEAD } from '../actions'
import { rootReducer } from '../reducers'
import { connect } from 'react-redux'
import Game from '../components/Game'

function mapStateToProps(state) {
  return {
    chosenMob: state.randomMob,
    alive: state.alive,
    gameOver: state.gameOver,
    score: state.score,
    needNewCall: state.needNewCall
  }
}

function mapDispatchToProps(dispatch) {
  return {
    killMob: () => dispatch(HIT_MOB),
    updateScore: () => dispatch(REWRITE_SCORE)
  }
}

const HitType = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default HitType