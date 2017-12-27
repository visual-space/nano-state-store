// import { DEBUG } from '../../../config/app.config'

// Intefaces
import { MapCurrState, MapPrevState } from './interfaces/nano-state-store'

// Utils
import { mergeDeep } from './utils'

/**
 * ====== APP STATE LOGIC ======
 * <!> NanoStateStore and RouteState are stateful services.
 *     All other services are written as pure functions, and they don't store state.
 */

// Debug
// let debug = require('debug')('vs:NanoStateStore')
// DEBUG.instance && debug('Instantiate NanoStateStore')

export class NanoStateStore<AS> {
// module.exports = class NanoStateStore<AS> {
// export default class NanoStateStore<AS> {
    
    /**
     * <!> This is the central location where the entire state of the app is stored.
     *     It closely mimics the redux architecture
     * <!> The main purpose of this setup is to avoid calling state from one controller/service to another
     *     We want ot avoid spagheti code, we want to apply a unidirectional approach
     * <!> This state may be mutated but on the other side we always get a clonde, no references will be kept
     *     There is no way to return back from components and overwrite in here
     */
    appState: AS
    
    /**
     * <!> Keeping all states in an array is the way the undo functionality will work
     *     The number of states could be restricted, but for the editor function they need to be unlimited
     * REFACTOR could use only changes
     */
    appStateHistory: AS[] = []

    constructor (appInitialState: AS) {
        this.appState = appInitialState
        this.appStateHistory.push(this.appState)
    }

    /** 
     * Clones previous state and deep merges the state changes
     * <!> The type is passed in the event in order to properly target the right components for the update cycle 
     * <!> THe mapping method is used to restrict the selection (redux sekection, principle of segregation)
     *     It can also apply advanced transformations
     * <!> One or many action types can be triggered by one appState update (similar to chaining effects/epics in redux)
     */
    setAppState(
        type: string | string[], // Action type
        appStateChanges: AS | any, // MapPrevState, // Reducer // TODO Union type of object and method does no work ok
        map: MapCurrState<AS> | MapCurrState<AS>[], // Selector
    ): void {
    
        // Prev state
        let prevAppState: AS = JSON.parse(JSON.stringify(this.appState))
    
        // Prev state + changes 
        if (typeof appStateChanges === 'function') {
            appStateChanges = (<MapPrevState<AS>>appStateChanges)(prevAppState)
        }
    
        // New state
        let newAppState: AS = mergeDeep(prevAppState, appStateChanges)
    
        // Cache
        this.appState = newAppState
        this.appStateHistory.push(newAppState)
    
        // Middleware could be inserted here
    
        // One or multiple events
        if (type.constructor === Array) {
            (<string[]>type).forEach( (type, i) => 
                this.dispatchAppStateEv((<MapCurrState<AS>[]>map)[i], type, prevAppState, newAppState)
            )
        } else {
            this.dispatchAppStateEv(<MapCurrState<AS>>map, <string>type, prevAppState, newAppState)
        }
        
    }
    
    /** Read the state without references */
    getState(): AS {
        let _appState: AS = JSON.parse(JSON.stringify(this.appState))
        // if (DEBUG.data && DEBUG.verbose) debug('Get app state', [_appState])
        return _appState
    }
    
    /* Send state update event */
    dispatchAppStateEv (
        map: MapCurrState<AS>, 
        actionType: string, 
        _prevAppState: AS, 
        newAppState: AS
    ) {
        let mappedState: any = map(newAppState), // Equivalent of redux selector
            event: CustomEvent = new CustomEvent(<string>actionType, { detail: mappedState })
    
        // if (DEBUG.data && DEBUG.verbose) debug('Set app state', actionType, [prevAppState, newAppState, mappedState])
        document.dispatchEvent(event)
    }
    
    // <!> The reactive part is not so well developed right now. 
    //     We should be able to call these methods and the app should react, This is not that easy with promises, or is it not? subscribeUndo can emulate this? 
    //     It will be possible to do so using events with action types
    // export const undo = () => {}
    // export const redo = () => {}
    // export const getStateHistory = () => {}

}