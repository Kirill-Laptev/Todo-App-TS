import { TodolistType, todolistsAPI } from './../api/todolists-api';
import { Dispatch } from 'redux';
import { setAppStatusAC, StatusType } from './app-reducer';


const initialState: Array<TodolistDomainType> = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch(action.type){
        case 'REMOVE_TODOLIST': 
            return state.filter((todolist) => todolist.id !== action.todoListId)  

        case 'ADD_TODOLIST':
            return [
                {...action.todolist, filter: 'all', entityStatus: 'idle'},
                ...state
            ]
        
        case 'CHANGE_TODOLIST_TITLE':
            return state.map((todolist) => todolist.id === action.todoListId ? {...todolist, title: action.newTodolistTitle} : todolist)

        case 'CHANGE_TODOLIST_FILTER':
            return state.map((todolist) => todolist.id === action.todoListId ? {...todolist, filter: action.filter} : todolist)
        
        case 'SET_TODOLISTS': 
            return action.todolists.map((td) => ({...td, filter: 'all', entityStatus: 'idle'}))
        
        case 'CHANGE_TODOLIST_ENTITY_STATUS': 
            return state.map((todolist) => todolist.id === action.todoListId ? {...todolist, entityStatus: action.entityStatus}: todolist)    
        
            default:
            return state
    }
}



// actions
export const removeTodolistAC = (todoListId: string) => ({type: 'REMOVE_TODOLIST', todoListId} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD_TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (todoListId: string, newTodolistTitle: string) => ({type: 'CHANGE_TODOLIST_TITLE', todoListId, newTodolistTitle} as const)

export const changeTodolistFilterAC = (filter: FilterValuesType, todoListId: string) => ({type: 'CHANGE_TODOLIST_FILTER', filter, todoListId} as const)

// Общий для двух редюсеров
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists} as const)
// ========================

export const changeTodolistEntityStatusAC = (todoListId: string, entityStatus: StatusType) => ({type: 'CHANGE_TODOLIST_ENTITY_STATUS', todoListId, entityStatus} as const)


// thunk's
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
        .then(({data}) => {
          dispatch(setTodolistsAC(data))
          dispatch(setAppStatusAC('success'))
        })
    }
}

export const deleteTodolistTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todoListId,'loading')) // Не нужно потом менять статус тудулиста, так как он удалится
        todolistsAPI.deleteTodolist(todoListId)
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(removeTodolistAC(todoListId))
                dispatch(setAppStatusAC('success'))
            }
        })
    }
}

export const createTodolistTC = (newTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(newTitle)
        .then(({data}) => {
            dispatch(addTodolistAC(data.data.item))
            dispatch(setAppStatusAC('success'))
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

// types
export type FilterValuesType = 'all' | 'active' | 'complited'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

export type ActionsType = 
| RemoveTodolistActionType 
| AddTodolistActionType  
| ReturnType<typeof changeTodolistTitleAC>
| ReturnType<typeof changeTodolistFilterAC>
| SetTodolistsActionType
| ReturnType<typeof changeTodolistEntityStatusAC>


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>





