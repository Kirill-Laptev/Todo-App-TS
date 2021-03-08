import { v1 } from 'uuid';
import { TasksStateType } from './../App';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistID: string
    taskID: string
}

export type AddTaskActionType = {
    type: 'ADD_TASK'
    todolistID: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    todolistID: string
    taskID: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todolistID: string
    taskID: string
    title: string
}



export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch(action.type){
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter((task) => task.id !== action.taskID)
            }
        }

        case 'ADD_TASK': {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        }

        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map((task) => {
                    if(task.id !== action.taskID){
                        return task
                    } else{
                        return {...task, isDone: action.isDone}
                    }
                })
            }
        }

        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map((task) => {
                    if(task.id !== action.taskID){
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        }

        case 'ADD_TODOLIST': {
            return {
                ...state,
                [action.todolistID]: []
            }
        }

        case 'REMOVE_TODOLIST': {
            let copyState = {...state}  
            delete copyState[action.todolistID] // Срабатывает только так (из-за входящих типов)
            return copyState
        }

        default:
            throw new Error('I dont understand this type')
    }
}

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', todolistID, taskID}
}

export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todolistID}
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', todolistID, taskID, isDone}
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', todolistID, taskID, title}
}