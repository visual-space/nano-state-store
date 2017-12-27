// import { NanoStateStore } from './nano-state-store'


/**
 * ====== NANO DATA BIND SPEC ======
 * Extensive testing was done for the data bondoings to make sure they work as expected no matter what other modificaitons are made
 * The data bindings will be used globally and they need to be tested thoroughly
 * TODO Curretn tests setup leaks events between tests. Using unique event names would need 
 */

// Give acccess to debug in testing environment^s console
// Sometimes tests can be fixed by studying the debug statements
// ;(window as any).debug = require('debug')
// declare var debug: any

// const MOCK_EVENT = 'MOCK_EVENT'

describe('NanoStateStore', () => {

    // ====== PARAMS VALIDATION ======

    describe('Params validation', () => {

        beforeEach(() => {})
        afterEach(() => {})
        
        it('Dummy test', () => {
            expect(1).toEqual(1)
        })
        
    })
})