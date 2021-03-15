import { todolistsReducer, removeTodolistAC, addTodolistAC } from './todolists-reducer';
import { TodolistsType, FilterValuesType } from './../AppWithRedux';
import { v1 } from 'uuid';

test('correct todolist should be removed', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const action = removeTodolistAC(todolistID1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})


test('correct todolist should be added', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const newTitle = 'New todolist'

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const action = addTodolistAC(newTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})


test('correct todolist should be change title', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const newTodolistTitle = 'New todolist title'

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE_TODOLIST_TITLE' as const, 
        newTodolistTitle: newTodolistTitle, 
        todolistID: todolistID2
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const newTodolistFilter: FilterValuesType = 'complited'

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE_TODOLIST_FILTER' as const, 
        filter: newTodolistFilter, 
        todolistID: todolistID2
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodolistFilter)
})