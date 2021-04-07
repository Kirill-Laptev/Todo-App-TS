import { TodolistType } from './../api/todolists-api';
import { todolistsReducer, removeTodolistAC, addTodolistAC, FilterValuesType, TodolistDomainType, setTodolistsAC, changeTodolistEntityStatusAC } from './todolists-reducer';
import { v1 } from 'uuid';


let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

        startState = [
            {id: todolistID1, title: 'What to learn', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
            {id: todolistID2, title: 'What to buy', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const action = removeTodolistAC(todolistID1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})


test('correct todolist should be added', () => {

    const todolist = {
        title: 'New todolist',
        id: todolistID1,
        addedDate: '',
        order: 0
    }

    const action = addTodolistAC(todolist)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New todolist')
})


test('correct todolist should be change title', () => {

    const newTodolistTitle = 'New todolist title'

    const action = {
        type: 'CHANGE_TODOLIST_TITLE' as const, 
        newTodolistTitle: newTodolistTitle, 
        todoListId: todolistID2
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed', () => {

    const newTodolistFilter: FilterValuesType = 'complited'

    const action = {
        type: 'CHANGE_TODOLIST_FILTER' as const, 
        filter: newTodolistFilter, 
        todoListId: todolistID2
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodolistFilter)
})


test('todolists should be added', () => {

    const action = setTodolistsAC(startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})


test('todolist entityStatus should be changed', () => {

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistID1, 'loading'))

    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})