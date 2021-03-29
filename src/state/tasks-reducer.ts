import { TaskItemType, TaskStasuses, TaskPriorities } from './../api/todolists-api';
import { v1 } from 'uuid';
import { TasksStateType } from '../AppWithRedux';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';


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
    status: TaskStasuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todolistID: string
    taskID: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET_TASKS'
    todolistID: string
    tasks: Array<TaskItemType>
}

export type ActionType = 
RemoveTaskActionType | 
AddTaskActionType | 
ChangeTaskStatusActionType | 
ChangeTaskTitleActionType | 
AddTodolistActionType | 
RemoveTodolistActionType |
SetTodolistsActionType |
SetTasksActionType

// Это важный момент, чтобы у нас был одинаковый id.
// Используем здесь в initialState и импортуруем для другого initialState в другой reducer.
export const todolistID1 = v1()
export const todolistID2 = v1()

const initialState: TasksStateType = {
    // [todolistID1]: [
    //   {id: v1(), title: 'JS', isDone: true},
    //   {id: v1(), title: 'ReactJS', isDone: true},
    //   {id: v1(), title: 'ExpressJS', isDone: false},
    //   {id: v1(), title: 'Typescript', isDone: false},
    //   {id: v1(), title: 'HTML/CSS', isDone: true}],
    //   [todolistID2]: [
    //     {id: v1(), title: 'Milk', isDone: false},
    //     {id: v1(), title: 'Book', isDone: true},
    //     {id: v1(), title: 'Food for cat', isDone: false}]
  }


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch(action.type){
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter((task) => task.id !== action.taskID)
            }
        }

        case 'ADD_TASK': {                              // Внимание - todoListId
            const newTask = {id: v1(), title: action.title, status: TaskStasuses.New, todolistID: action.todolistID,
            description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
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
                        return {...task, status: action.status}
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

        case 'SET_TODOLISTS': {
            let copyState = {...state}
            action.todolists.forEach((td) => {
                copyState[td.id] = []
            })
            return copyState
        }

        case 'SET_TASKS': {
            let copyState = {...state}
            copyState[action.todolistID] = action.tasks
            return copyState
        }


        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', todolistID, taskID}
}

export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todolistID}
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStasuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', todolistID, taskID, status}
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', todolistID, taskID, title}
}

export const setTasksAC = (todolistID: string, tasks: Array<TaskItemType>) => {
    return {type: 'SET_TASKS', todolistID, tasks}
}