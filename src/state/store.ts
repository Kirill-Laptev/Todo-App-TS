import { TasksStateType } from './../App';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { combineReducers, createStore } from "redux";
import { TodolistsType } from '../App';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)


// Можно было определить типы так, но это не удобно.
// export type AppRootState = {
//     todolists: Array<TodolistsType>
//     tasks: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>