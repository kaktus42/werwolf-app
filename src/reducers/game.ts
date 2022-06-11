import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'

const resetRolesR: CaseReducer<GameState> = (state) => {
    return { ...state, pickedRoles: _resetPickedRoles(state.availableRoles) }
}

const _resetPickedRoles = (availableRoles: { [key: string]: string }): GameState["pickedRoles"] => {
    let pickedRoles: GameState["pickedRoles"] = {}
    Object.keys(availableRoles).forEach(roleKey => pickedRoles[roleKey] = 0);
    return pickedRoles
}

const dealRolesR: CaseReducer<GameState> = (state) => {
    let players: Player[] = []

    for (let roleKey in state.pickedRoles) {
        for (let i = 0; i < state.pickedRoles[roleKey]; i++) {
            players.push({ role: roleKey, alive: true })
        }
    }

    for (let i = players.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [players[i], players[j]] = [players[j], players[i]];
    }

    return { ...state, players, deal: initialState.deal }
}

const initialRoles = {
    werwolf: "Werwolf",
    dorfbewohner: "Dorfbewohner",
    seherin: "Seherin",
    hexe: "Hexe",
    jaeger: "Jäger",
    armor: "Armor",
    heiler: "Heiler",
    prinz: "Prinz",

    AlterMann: "Alter Mann",
    depp: "Dorfdepp",
    drache: "Drache (Joker)",
    bursche: "Harter Bursche",
    lykanthrophin: "Lykanthrophin",
    post: "Postbote (Joker)",
    priest: "Priester",
    lehrling: "Seherlehrling",
    traumwolf: "Traumwolf (Joker)",
    whiteWolf: "Weißer Wolf",
    wolfsjunges: "Wolfsjunges",
    zahnarzt: "Zahnarzt",
};

const initialState: GameState = function () {
    return {
        availableRoles: { ...initialRoles },
        pickedRoles: _resetPickedRoles(initialRoles),
        players: [
            // { role: 'dorfbewohner', alive: false },
            // { role: 'werwolf', alive: true },
        ],
        deal: {
            activeRoleIdx: 0,
            roleWasVisible: false,
            roleIsVisible: false,
        }
    }
}();

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addRole(state, action: PayloadAction<string>): GameState {
            const roleKey = action.payload
            let count = state.pickedRoles[roleKey]
            let pickedRoles = { ...state.pickedRoles }
            pickedRoles[roleKey] = count + 1
            return { ...state, pickedRoles }
        },

        removeRole(state, action: PayloadAction<string>): GameState {
            const roleKey = action.payload
            let count = state.pickedRoles[roleKey]
            if (count <= 0) {
                return state
            }
            let pickedRoles = { ...state.pickedRoles }
            pickedRoles[roleKey] = count - 1
            return { ...state, pickedRoles }
        },

        createRole(state, action: PayloadAction<string>): GameState {
            const newRoleName = action.payload;
            const newRoleID = newRoleName.replaceAll(/[^\w]/g, "").toLowerCase();

            if (newRoleID in state.availableRoles) {
                alert(`Role "${newRoleName}" with ID "${newRoleID}" already exists`)
                return state;
            }

            return {
                ...state,
                availableRoles: {
                    ...state.availableRoles,
                    [newRoleID]: newRoleName,
                },
                pickedRoles: {
                    ...state.pickedRoles,
                    [newRoleID]: 0,
                },
            };
        },

        resetRoles: resetRolesR,
        dealRoles: dealRolesR,

        currentRoleToggleVisibility(state): GameState {
            return {
                ...state,
                deal: {
                    ...state.deal,
                    roleIsVisible: !state.deal.roleIsVisible,
                    roleWasVisible: true,
                }
            }
        },

        dealNextRole(state): GameState {
            if (state.deal.activeRoleIdx + 1 >= state.players.length) {
                return state
            }
            return {
                ...state,
                deal: {
                    activeRoleIdx: state.deal.activeRoleIdx + 1,
                    roleIsVisible: false,
                    roleWasVisible: false,
                }
            }
        },

        togglePlayerAlive(state, action: PayloadAction<number>): GameState {
            let playerID = action.payload
            state.players[playerID].alive = !state.players[playerID].alive
            return state
        },

        fullReset(state): GameState {
            return {
                ...initialState,
                availableRoles: state.availableRoles,
                pickedRoles: state.pickedRoles,
            }
        },
    }
})

const { actions, reducer } = gameSlice
export const { addRole, removeRole, createRole, resetRoles, dealRoles, currentRoleToggleVisibility, dealNextRole, togglePlayerAlive, fullReset } = actions
export default reducer
