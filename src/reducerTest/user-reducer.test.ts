import { userReducer } from "./user-reducer"

test('user reducer should increment only age', () => {
    const startState = {
        age: 20,
        name: 'Ann',
        childrenCount: 1
    }

    const endState = userReducer(startState, {type: 'INCREMENT_AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(1)
})

test('user reducer should increment only children count', () => {
    const startState = {
        age: 20,
        name: 'Ann',
        childrenCount: 1
    }

    const endState = userReducer(startState, {type: 'INCREMENT_CHILDREN_COUNT'})

    expect(endState.childrenCount).toBe(2)
    expect(endState.age).toBe(20)
})

test('user reducer should change only name', () => {
    const startState = {
        age: 20,
        name: 'Ann',
        childrenCount: 1
    }

    const newName = 'Kate'

    const endState = userReducer(startState, {type: 'CHANGE_NAME', name: newName})

    expect(endState.name).toBe(newName)
})