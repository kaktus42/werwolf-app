
declare interface GameState {
    availableRoles: { [key: string]: string }
    pickedRoles: { [key: string]: number }
    players: Player[]
    deal: {
        activeRoleIdx: number
        roleWasVisible: boolean
        roleIsVisible: boolean
    }
}

declare type Player = {
    role: string
    alive: boolean
}

declare type Page = "prepare" | "deal" | "play" | "about"

declare interface UIState {
    menuIsOpen: boolean
    currentPage: Page
}

declare interface RootState {
    ui: UIState
    game: GameState
}
