import { MapCurrState } from './interfaces/nano-state-store';
export declare class NanoStateStore<AS> {
    appState: AS;
    appStateHistory: AS[];
    constructor(appInitialState: AS);
    setAppState(type: string | string[], appStateChanges: AS | any, map: MapCurrState<AS> | MapCurrState<AS>[]): void;
    getState(): AS;
    dispatchAppStateEv(map: MapCurrState<AS>, actionType: string, _prevAppState: AS, newAppState: AS): void;
}
