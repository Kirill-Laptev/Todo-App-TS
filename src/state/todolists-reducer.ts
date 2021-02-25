import { v1 } from 'uuid';
import { TodolistsType, FilterValuesType } from './../App';

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD_NEW_TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    title: string
    id: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    filter: FilterValuesType
    id: string
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch(action.type){
        case 'REMOVE_TODOLIST':
            const filtredTodolists = state.filter((todolist) => todolist.id !== action.id)
            return filtredTodolists

        case 'ADD_NEW_TODOLIST':
            return [
                ...state,
                {id: v1(), title: action.title, filter: 'all'}
            ]
        
        case 'CHANGE_TODOLIST_TITLE':
            const withNewTitle = state.map((todolist) => {
                if(todolist.id === action.id) {
                    return {...todolist, title: action.title}
                } else {
                    return {...todolist}
                }
            })
        return withNewTitle

        case 'CHANGE_TODOLIST_FILTER':
            const withNewFilter = state.map((todolist) => {
                if(todolist.id === action.id){
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


// В тесты мы можем экспортировать Action Creator'ы
// Пока не стал это дедать для лучшего понимания кода.
// В следующем уроке можно уверенно вставить

// export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
//     return {type: 'REMOVE_TODOLIST', id: todolistID}
// }

// export const addNewTodolistAC = (newTitle: string): AddTodolistActionType => {
//     return {type: 'ADD_NEW_TODOLIST', title: newTitle}
// }

// export const changeTodolistTitleAC = (newTodolistTitle: string, todolistID: string): ChangeTodolistTitleActionType => {
//     return {type: 'CHANGE_TODOLIST_TITLE', title: newTodolistTitle, id: todolistID}
// }

// export const changeTodolistFilterAC = (filter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
//     return {type: 'CHANGE_TODOLIST_FILTER', filter: filter, id: todolistID}
// }