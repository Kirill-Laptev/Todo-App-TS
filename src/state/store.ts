import { appReducer } from './app-reducer';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootState = ReturnType<typeof rootReducer>


// Можно было определить типы так, но это не удобно.
// export type AppRootState = {
//     todolists: Array<TodolistsType>
//     tasks: TasksStateType
// }