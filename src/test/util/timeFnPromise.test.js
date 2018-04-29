import {timeFnPromise} from '../../util/timeFnPromise'

/**
 * Sample function that returns a Promise that resolves according to the specified delay and success / failure indicator.
 */
const functionThatReturnsAPromise = (delayInMillis, fail) =>
    new Promise((resolve, reject) =>
        setTimeout(() => !!fail ? reject('Failure :(') : resolve(`Success ;)`), delayInMillis))

/**
 * Wrap a function that returns a promise with timeFnPromise.
 */
const wrappedFunctionThatReturnsAPromise = timeFnPromise(functionThatReturnsAPromise)

describe('Promise timing', () => {

    test("fn doesn't return a Promise", () => {
        expect(timeFnPromise(() => 'boo')).toThrow('Expected function to return a Promise!')
    })

    test('resolved', done => {
        wrappedFunctionThatReturnsAPromise(200)
            .then((values) => {
                const {ret, elapsedTime} = values
                expect(ret).toBe('Success ;)')
                expect(elapsedTime).toBeGreaterThanOrEqual(200)
                done()
            })
    })

    test('rejected', done => {
        wrappedFunctionThatReturnsAPromise(500, true)
            .then((values) => {
                const {ret, elapsedTime} = values
                expect(ret).toBe('Failure :(')
                expect(elapsedTime).toBeGreaterThanOrEqual(500)
                done()
            })
            .catch((e) => console.error(e))
    })

})