const initialState: InitialAppReducerStateType  = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialAppReducerStateType = initialState, action: AppActionsType) => {
    switch(action.type){
        case 'app/SET_STATUS': 
            return {...state, status: action.status}

        case 'app/SET_ERROR':
            return {...state, error: action.error}    
        default: 
            return state
    }
}

export const setAppStatusAC = (status: StatusType) => ({type: 'app/SET_STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'app/SET_ERROR', error} as const)


// types
export type StatusType = 'idle' | 'success' | 'loading' | 'failed'

export type InitialAppReducerStateType = {
    status: StatusType
    error: string | null
}

type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType