import { v1 } from 'uuid';
import { TodolistsType, FilterValuesType } from './../App';

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

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

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch(action.type){
        case 'REMOVE_TODOLIST':
            const filtredTodolists = state.filter((todolist) => todolist.id !== action.todolistID)
            return filtredTodolists

        case 'ADD_TODOLIST':
            return [
                {id: action.todolistID, title: action.newTitle, filter: 'all'},
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


        default:
            throw new Error('I dont understand this type')
    }
}



export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE_TODOLIST', todolistID}
}

export const addTodolistAC = (newTitle: string): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', newTitle, todolistID: v1()}
}

export const changeTodolistTitleAC = (newTodolistTitle: string, todolistID: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', newTodolistTitle, todolistID}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', filter, todolistID}
}