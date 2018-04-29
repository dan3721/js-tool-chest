/**
 * Wraps the specified function in an arrow function that times the promise and
 * appends fulfillment / rejection handler that returns the return value as "ret" and the elapsed time as "elapsedTime".
 *
 * @param fn - Function that is exptected to return a Promise.
 *
 *
 */
const timeFnPromise = (fn) => (...args) => {
    const start = Date.now()
    const promise = fn(...args)
    if (!promise.then) {
        throw 'Expected function to return a Promise!'
    }
    const calcElapsedTime = (ret) => {
        return {ret, elapsedTime: Date.now() - start}
    }
    return promise.then(calcElapsedTime, calcElapsedTime)
}

export {
    timeFnPromise
}