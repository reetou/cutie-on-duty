import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import CutieOnDuty from './CutieOnDuty'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <CutieOnDuty />
      </Provider>
    )
  }
}