import { HandleAppNetworkError, HandleAppServerError } from './../helpers/error-handlers';
import { Dispatch } from "redux"
import { authAPI } from "../api/auth-api"
import { setIsLoggedInAC, SetLoggedInType } from "./auth-reducer"


// Более компактная типизация
const initialState = {
    status: 'idle' as StatusType,
    error: null as null | string,
    isInicialized: false as boolean
}

type InitialStateType = typeof initialState


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType) => {
    switch(action.type){
        case 'app/SET_STATUS': 
            return {...state, status: action.status}

        case 'app/SET_ERROR':
            return {...state, error: action.error}  
            
        case 'app/SET_IS_INICIALIZED': 
            return {...state, isInicialized: action.isInicialized}

        default: 
            return state
    }
}


// actions
export const setAppStatusAC = (status: StatusType) => ({type: 'app/SET_STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'app/SET_ERROR', error} as const)
export const setIsInicializedAC = (isInicialized: boolean) => ({type: 'app/SET_IS_INICIALIZED', isInicialized} as const)

// thunk's

export const appInizializedTC = () => {
    return (dispatch: Dispatch<AppActionsType>) => {
        authAPI.authMe()
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
            } else{
                HandleAppServerError(data, dispatch)
            }
            dispatch(setIsInicializedAC(true))
        })
        .catch((error) => {
            HandleAppNetworkError(error, dispatch)
        })
    }
}

// types
export type StatusType = 'idle' | 'success' | 'loading' | 'failed'

// export type InitialAppReducerStateType = {
//     status: StatusType
//     error: string | null
//     isInicialized: boolean
// }

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type AppActionsType = 
| SetAppStatusActionType 
| SetAppErrorActionType 
| ReturnType<typeof setIsInicializedAC>
| SetLoggedInType