import { AppRootState } from './store';
import { TaskItemType, TaskStasuses, TaskPriorities, todolistsAPI, UpdateTaskModelType } from './../api/todolists-api';
import { v1 } from 'uuid';
import { TasksStateType } from '../AppWithRedux';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { Dispatch } from 'redux';


export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todoListId: string
    taskID: string
}

export type AddTaskActionType = {
    type: 'ADD_TASK'
    newTask: TaskItemType
}

export type ChangeTaskStatusActionType = {
    type: 'UPDATE_TASK'
    todoListId: string
    taskID: string
    model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todoListId: string
    taskID: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET_TASKS'
    todoListId: string
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
                [action.todoListId]: state[action.todoListId].filter((task) => task.id !== action.taskID)
            }
        }

        case 'ADD_TASK': {   // Добавляем новую таску пришедшую с сервера и раскладываем все предыдущие таски в массив
            return {         // Внимание что приходит с сервера todoListId, а не todolisID
                ...state,
                [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]
            }
        }

        case 'UPDATE_TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((task) => {
                    if(task.id !== action.taskID){
                        return task
                    } else{
                        return {...task, ...action.model}
                    }
                })
            }
        }

        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((task) => {
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
                [action.todolist.id]: []
            }
        }

        case 'REMOVE_TODOLIST': {
            let copyState = {...state}  
            delete copyState[action.todoListId] // Срабатывает только так (из-за входящих типов)
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
            copyState[action.todoListId] = action.tasks
            return copyState
        }


        default:
            return state
    }
}

// Action creator
export const removeTaskAC = (todoListId: string, taskID: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', todoListId, taskID}
}

export const addTaskAC = (newTask: TaskItemType): AddTaskActionType => {
    return {type: 'ADD_TASK', newTask}
}

export const updateTaskAC = (todoListId: string, taskID: string, model: UpdateDomainTaskModelType): ChangeTaskStatusActionType => {
    return {type: 'UPDATE_TASK', todoListId, taskID, model}
}

export const changeTaskTitleAC = (todoListId: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', todoListId, taskID, title}
}

export const setTasksAC = (todoListId: string, tasks: Array<TaskItemType>) => {
    return {type: 'SET_TASKS', todoListId, tasks}
}


// Thunk creator
export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoListId)
        .then(({data}) => {
            dispatch(setTasksAC(todoListId, data.items))
        })
    }
}

export const removeTaskTC = (todoListId: string, taskID: string) => {
    return (dispatch: Dispatch) => {
            todolistsAPI.deleteTask(todoListId, taskID)
            .then(({data}) => {
                if(data.resultCode === 0) {
                dispatch(removeTaskAC(todoListId, taskID))
            }
        })
    }
}

export const AddTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todoListId, title)
        .then(({data}) => {
            dispatch(addTaskAC(data.data.item))
        })
    }
}




export type UpdateDomainTaskModelType = {
    title?: string
    description?: string | null
    status?: TaskStasuses
    priority?: number
    startDate?: string | null
    deadline?: string | null
}

// Делаем одну thunk'у на обновление чекбокса или названия таски (title)
// domainModel - это то что будет приходить внутрь, необходимое для изменения на сервере.
// Все остально для этой таски мы подтянем из state, достав эту таску для которой мы будем делать изменения.
// Типы описали отдельно и с вопросительным знаком, чтобы могли передавать что угодно во внутрь, любую часть.


export const updateTaskTC = (todoListId: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
      
    const state = getState()
    const task = state.tasks[todoListId].find((task) => task.id === taskID)
    
    // Чтобы не ругался TS, что он может не найти task
    if(!task){
        throw new Error('task not found in state')
    }

    const modelApi: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel  // Таким образом перезатираем свойства старой таски на новые (может перезатереться и 
                        // одно свойство, если мы в domainModel передадим одно свойство )
    }

    todolistsAPI.updateTask(todoListId, taskID, modelApi)
        .then((response) => {
            dispatch(updateTaskAC(todoListId, taskID, domainModel)) 
        })
    }
}