import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        menuIsOpen: false,
        currentPage: 'prepare',
        // currentPage: 'play',
    } as UIState,
    reducers: {
        navTo(state, action: PayloadAction<Page>): UIState {
            return { ...state, currentPage: action.payload }
        }
    },
})

const { actions, reducer } = uiSlice
export const { navTo } = actions
export default reducer
