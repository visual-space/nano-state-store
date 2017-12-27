
export type MapPrevState<AS> = (appState: AS) => AS // Map prev state to new state with changes
export type MapCurrState<AS> = (appState: AS) => any