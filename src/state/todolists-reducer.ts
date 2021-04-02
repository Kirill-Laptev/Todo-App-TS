import { TodolistType, todolistsAPI } from './../api/todolists-api';
import { todolistID1, todolistID2 } from './tasks-reducer';
import { v1 } from 'uuid';
import { Dispatch } from 'redux';

export type ActionType = 
RemoveTodolistActionType |
AddTodolistActionType | 
ChangeTodolistTitleActionType | 
ChangeTodolistFilterActionType |
SetTodolistsActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    todoListId: string
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    todolist: TodolistType
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    newTodolistTitle: string
    todoListId: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    filter: FilterValuesType
    todoListId: string
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
            const filtredTodolists = state.filter((todolist) => todolist.id !== action.todoListId)
            return filtredTodolists

        case 'ADD_TODOLIST':
            return [
                {...action.todolist, filter: 'all'},
                ...state
            ]
        
        case 'CHANGE_TODOLIST_TITLE':
            const withNewTitle = state.map((todolist) => {
                if(todolist.id === action.todoListId) {
                    return {...todolist, title: action.newTodolistTitle}
                } else {
                    return {...todolist}
                }
            })
        return withNewTitle

        case 'CHANGE_TODOLIST_FILTER':
            const withNewFilter = state.map((todolist) => {
                if(todolist.id === action.todoListId){
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


// Action creator
export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE_TODOLIST', todoListId}
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', todolist}
}

export const changeTodolistTitleAC = (todoListId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', todoListId, newTodolistTitle}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', filter, todoListId}
}

// Общий для двух редюсеров
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET_TODOLISTS', todolists}
}


// Thunk creator
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
        .then(({data}) => {
          dispatch(setTodolistsAC(data))
        })
    }
}

export const deleteTodolistTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todoListId)
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(removeTodolistAC(todoListId))
            }
        })
    }
}

export const createTodolistTC = (newTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(newTitle)
        .then(({data}) => {
            dispatch(addTodolistAC(data.data.item))
        })
    }
}

export const updateTodolistTitleTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todoListId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todoListId, title))
        })
    }
}




