import { HandleAppNetworkError, HandleAppServerError } from './../helpers/error-handlers';
import { setAppStatusAC } from './app-reducer';
import { LoginParamsType } from './../api/auth-api';
import { authAPI } from "../api/auth-api"
import { Dispatch } from 'redux';

const initialState = {}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType) => {
    switch(action.type){

        default:
            return state
    }
}

export const loginTC = (authData: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(authData)
        .then(({data}) => {
            if(data.resultCode === 0){
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

type AuthActionsType = any
type InitialStateType = {}