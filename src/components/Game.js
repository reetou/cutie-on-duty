import React from 'react'
import { Component } from 'react'

// React component
class Game extends Component {
  render() {
    const { 
            score, mob,
            finishedAt, levelBackground, 
            readyForDeath, hitState, 
            step, gameOver, 
            showDead, mobQuote,
            gameStarted
          } = this.props
    let options = { 
    year: '2-digit', month: '2-digit',
    day: '2-digit', hour: '2-digit', 
    minute: '2-digit', second: '2-digit'
    }
    let stringedDate = (new Date(finishedAt)).toLocaleDateString('ru-RU', options)
    let levelBg = 'img/level-bg/' + levelBackground + '.png'
    let dynamicStyles = {
      levelbg: {
        backgroundImage: 'url(' + levelBg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflow: 'hidden',
      },
      mobanimation: {
        position: 'relative',
        right: step,
        transition: '2s',
        display: showDead
      },
      mobquote: {
        display: showDead
      }
    }
    return (
      <div className='game-field' onClick={ this.props.hitMob }>
        <div className='level-background' style={ dynamicStyles.levelbg }>
          <div className='level-info'>
            <div>
              <span className={ gameStarted ? 'score' : 'score hidden' }>Мобов убито: { score } </span>
            </div>
          </div>
          <div className='mob-state'>
            <p className={ gameOver ? 'hidden' : 'ok' }>{ readyForDeath ? 'БЕЙ!' : '' }</p>
            <p className={ gameOver ? 'ok' : 'hidden' }>
              Вы проиграли!
              <br />
              Игра начнется через 5 секунд
            </p>
          </div>
          <div className='actions'>
            <button 
              onClick={ this.props.callMob }
              className={ gameStarted ? 'hidden' : 'ok' }>
                Начать игру
            </button>
          </div>
          <div className='game'>
            <div className='main-character'>
              <img 
                role='presentation'
                src={ process.env.PUBLIC_URL + '/img/character/' + hitState + '.png' } 
              />
            </div>
            <div
              className='mob'
              style={ dynamicStyles.mobanimation }
            >
              <div 
                className='quote'
                style={ dynamicStyles.mobquote }
                >
                <p>{ mobQuote }</p>
              </div>
              <img
                role='presentation'
                src={ process.env.PUBLIC_URL + 'img/mobs/' + mob + '.png' }
              />
            </div>
          </div>
        </div>
        <div className='footer'>
          Последний проигрыш: <span>{ stringedDate.length>15 ? stringedDate : 'Вы еще не заканчивали игру' }</span>
        </div>
      </div>
    )
  }
}

export default Game