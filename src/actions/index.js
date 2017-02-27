// Actions
export const CALL_MOB = 'CALL_MOB'
export const HIT_MOB = 'HIT_MOB'
export const UNHIT_MOB = 'UNHIT_MOB'
export const START_GAME = 'START_GAME'
export const GAME_OVER = 'GAME_OVER'
export const MOB_READY = 'MOB_READY'
export const MOVE_MOB = 'MOVE_MOB'

export function callMob(mob) {
  return {
    type: CALL_MOB,
    mob
  }
}
export function hitMob(mob) {
  return {
    type: HIT_MOB,
    mob
  }
}
export function unHitMob() {
  return {
    type: UNHIT_MOB
  }
}
export function startGame() {
  return {
    type: START_GAME
  }
}
export function gameOver(date) {
  return {
    type: GAME_OVER,
    receivedAt: Date.now()
  }
}
export function mobReady(state) {
  return {
    type: MOB_READY,
    state
  }
}
export function stepMob(stepLength) {
  return {
    type: MOVE_MOB,
    stepLength
  }
}
export function shouldCallNewMob(state, randomMob) {
  const mob = state
  if (mob.alive) {
    return false
  } else if (mob.gameOver) {
    return false
  } else if (mob.needNewCall) {
    return true
  }
}
export function shouldMoveMob(state) {
  const mob = state
  if (!mob.readyForDeath && !mob.gameOver) {
    return true
  } else if (mob.step > 0) {
    return false
  } else if (!mob.alive) {
    return false
  }
}
export function shouldGameOver(state) {
  const mob = state
  if (mob.alive && mob.readyForDeath) {
    return true
  } else {
    return false
  }
}
export function shouldHitMob(state) {
  const mob = state
  if (mob.readyForDeath) {
    return true
  } else {
    return false
  }
}
export function callMobIfNeeded() {
  let mobs = [ 'crab', 'bull', 'pig' ]
  let randomMob = mobs[Math.floor(Math.random()*mobs.length)]
  return (dispatch, getState) => {
    if (shouldCallNewMob(getState(), randomMob)) {
      return (
        dispatch(callMob(randomMob)),
        setTimeout(function() {
          if (shouldMoveMob(getState()))
          dispatch(stepMob(100))
          setTimeout(function() {
            if (shouldMoveMob(getState())) {
              dispatch(stepMob(100))
              setTimeout(function() {
                if (shouldMoveMob(getState())) {
                  dispatch(stepMob(50))
                  dispatch(mobReady(true))
                  setTimeout(function() {
                    if (shouldGameOver(getState())) {
                      dispatch(gameOver())
                      setTimeout(function() {
                        dispatch(startGame())
                      }, 5000)
                    }
                  }, 1000)
                }
              }, 1000)
            }
          }, 1000)
        }, 1000)
      )
    }
  }
}
export function hitMobIfNeeded(state) {
  return (dispatch, getState) => {
    if (shouldHitMob(getState())) {
      return (
        dispatch(hitMob()),
        setTimeout(function() {dispatch(unHitMob())}, 300)
      )
    }
  }
}
