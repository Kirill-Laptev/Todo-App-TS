import { TodolistType } from './../api/todolists-api';
import { todolistID1, todolistID2 } from './tasks-reducer';
import { v1 } from 'uuid';

export type ActionType = 
RemoveTodolistActionType | 
AddTodolistActionType | 
ChangeTodolistTitleActionType | 
ChangeTodolistFilterActionType |
SetTodolistsActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    todolistID: string
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    newTitle: string
    todolistID: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    newTodolistTitle: string
    todolistID: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    filter: FilterValuesType
    todolistID: string
}

export type SetTodolistsActionType = {
    type: 'SET_TODOLISTS'
    todolists: Array<TodolistType>
}

export type FilterValuesType = 'all' | 'active' | 'complited'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch(action.type){
        case 'REMOVE_TODOLIST':
            const filtredTodolists = state.filter((todolist) => todolist.id !== action.todolistID)
            return filtredTodolists

        case 'ADD_TODOLIST':
            return [
                {id: action.todolistID, title: action.newTitle, filter: 'all', addedDate: '', order: 0},
                ...state
            ]
        
        case 'CHANGE_TODOLIST_TITLE':
            const withNewTitle = state.map((todolist) => {
                if(todolist.id === action.todolistID) {
                    return {...todolist, title: action.newTodolistTitle}
                } else {
                    return {...todolist}
                }
            })
        return withNewTitle

        case 'CHANGE_TODOLIST_FILTER':
            const withNewFilter = state.map((todolist) => {
                if(todolist.id === action.todolistID){
                    return {...todolist, filter: action.filter}
                } else {
                    return {...todolist}
                }
            })
        return withNewFilter
        
        case 'SET_TODOLISTS': 
            return action.todolists.map((td) => {
                return {...td, filter: 'all'}
            })

        default:
            return state
    }
}



export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE_TODOLIST', todolistID}
}

export const addTodolistAC = (newTitle: string): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', newTitle, todolistID: v1()}
}

export const changeTodolistTitleAC = (todolistID: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', todolistID, newTodolistTitle}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', filter, todolistID}
}

// Общий для двух редюсеров
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET_TODOLISTS', todolists}
}