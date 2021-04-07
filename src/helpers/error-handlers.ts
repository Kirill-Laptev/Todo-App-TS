import { setAppStatusAC } from '../state/app-reducer';
import { Dispatch } from 'redux';
import { setAppErrorAC } from '../state/app-reducer';
import { ResponseType } from '../api/todolists-api';

export const HandleAppServerError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    } else{
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const HandleAppNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message? error.message: 'Some error'))
    dispatch(setAppStatusAC('failed'))
}