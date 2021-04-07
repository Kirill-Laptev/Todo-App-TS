import { InitialAppReducerStateType, setAppErrorAC, appReducer, setAppStatusAC } from './app-reducer';

let startState: InitialAppReducerStateType;

beforeEach(() => {
        startState = {
            status: 'idle',
            error: null
        }
})

test('error should be added', () => {

    const action = setAppErrorAC('New error')
    const endState = appReducer(startState, action)

    expect(endState.error).toBe('New error')
})

test('status should be changed', () => {

    const action = setAppStatusAC('loading')
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
})