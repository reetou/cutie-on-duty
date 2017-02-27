import { gameOver, callMobIfNeeded, hitMobIfNeeded, startGame } from '../actions'
import { connect } from 'react-redux'
import React from 'react'
import { Component } from 'react'
import Game from '../components/Game'
import Guide from '../components/Guide'

class CutieOnDuty extends Component {
  
  constructor(props) {
    super(props)
    this.chainAction = this.chainAction.bind(this)
    this.handleAction = this.handleAction.bind(this)
  }
  chainAction(mob) {
    const { dispatch, gameOver } = this.props
    setInterval(function() {
      if (!gameOver) {
        dispatch(callMobIfNeeded())
      }
    }, 2000)
  }
  handleAction() {
    const { dispatch, readyForDeath, alive } = this.props
    if (readyForDeath) {
      dispatch(hitMobIfNeeded())
    } else if (!readyForDeath && alive) {
      dispatch(gameOver())
      setTimeout(function() {
        dispatch(startGame())
      }, 5000)
    }
  }
  render() {
    return (
      <div>
        <Guide />
        <Game     
          score={this.props.score} 
          callMob={this.chainAction}
          hitMob={this.handleAction}
          alive={this.props.alive}
          gameOver={this.props.gameOver}
          needNewCall={this.props.needNewCall}  
          mob={this.props.chosenMob}
          finishedAt={this.props.finishedAt}
          endGame={this.endGame}
          readyForDeath={this.props.readyForDeath}
          hitState={this.props.hit} 
          levelBackground={this.props.levelBackground}
          step={this.props.step}
          showDead={this.props.showDead}
          mobQuote={this.props.mobQuote}
          gameStarted={this.props.gameStarted}
        />
      </div>
    )
  }
}

 function mapStateToProps(state) {
    return {
      chosenMob: state.chosenMob,
      alive: state.alive,
      score: state.score,
      needNewCall: state.needNewCall,
      readyForDeath: state.readyForDeath,
      finishedAt: state.finishedAt,
      hit: state.hit,
      levelBackground: state.levelBackground,
      step: state.step,
      gameOver: state.gameOver,
      showDead: state.showDead,
      mobQuote: state.mobQuote,
      gameStarted: state.gameStarted
    }
  }

export default connect(
  mapStateToProps
)(CutieOnDuty)