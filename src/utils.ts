// import { DEBUG } from '../../../config/app.config'

// // Debug
// let debug = require('debug')('vs:SharedUtils')
// DEBUG.instance && debug('Instantiate SharedUtils')

/**
 * ====== UTILS ======
 * These methods can be reused in any module
 */

/** CHecks if value is object but not array */
export const isObject = (item: any): boolean => {
    let isObject: boolean = item && typeof item === 'object' && !Array.isArray(item)
    // if (DEBUG.util && DEBUG.verbose) debug('Is object', isObject)
    return isObject
}

/** Overwrite properties from obe object with properties from another object */
export const mergeDeep = (target: any, source: any) => {
    let output = Object.assign({}, target)
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] })
                else
                    output[key] = mergeDeep(target[key], source[key])
            } else {
                Object.assign(output, { [key]: source[key] })
            }
        })
    }
    
    // if (DEBUG.util && DEBUG.verbose) debug('Merge deep', output)
    return output
}