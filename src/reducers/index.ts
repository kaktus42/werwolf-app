import { combineReducers } from '@reduxjs/toolkit'
import gameSlice from './game'
import uiSlice from './ui'

export default combineReducers<RootState>({
    ui: uiSlice,
    game: gameSlice,
})
