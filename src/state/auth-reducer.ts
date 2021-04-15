import { HandleAppNetworkError, HandleAppServerError } from '../helpers/error-handlers';
import { setAppStatusAC, SetAppStatusActionType, SetAppErrorActionType } from './app-reducer';
import { LoginParamsType } from '../api/auth-api';
import { authAPI } from "../api/auth-api"
import { Dispatch } from 'redux';


const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType) => {
    switch(action.type){
        case 'auth/SET_IS_LOGGED_IN': 
        return {
            ...state,
            isLoggedIn: action.isLoggedIn
        }

        default:
            return state
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'auth/SET_IS_LOGGED_IN', isLoggedIn} as const)


export const loginTC = (authData: LoginParamsType) => {
    return (dispatch: Dispatch<AuthActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(authData)
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('success'))
                console.log(data)
            } else {
                HandleAppServerError(data, dispatch)
            }
        }) 
        .catch((error) => {
            HandleAppNetworkError(error, dispatch)
        })
    }
}

export type SetLoggedInType = ReturnType<typeof setIsLoggedInAC>

type AuthActionsType = 
| SetLoggedInType
| SetAppStatusActionType
| SetAppErrorActionType


type InitialStateType = {
    isLoggedIn: boolean
}