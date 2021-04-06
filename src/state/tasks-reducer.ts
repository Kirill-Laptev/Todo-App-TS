import { AppRootState } from './store';
import { TaskItemType, TaskStasuses, TaskPriorities, todolistsAPI, UpdateTaskModelType } from './../api/todolists-api';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { Dispatch } from 'redux';


export type TasksStateType = {
    [key: string]: Array<TaskItemType>
  }

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

        case 'ADD_TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }

        case 'REMOVE_TODOLIST': {
            let copyState = {...state}  
            delete copyState[action.todoListId] // Срабатывает только так 
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
            return {...state, [action.todoListId]: action.tasks}
        }

        default:
            return state
    }
}



// actions
export const removeTaskAC = (todoListId: string, taskID: string) => ({type: 'REMOVE_TASK', todoListId, taskID} as const)

export const addTaskAC = (newTask: TaskItemType) => ({type: 'ADD_TASK', newTask} as const)

export const updateTaskAC = (todoListId: string, taskID: string, model: UpdateDomainTaskModelType) => ({type: 'UPDATE_TASK', todoListId, taskID, model} as const)

export const setTasksAC = (todoListId: string, tasks: Array<TaskItemType>) => ({type: 'SET_TASKS', todoListId, tasks} as const)


// thunk's
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


// types

export type ActionType = 
ReturnType<typeof removeTaskAC>
| ReturnType<typeof addTaskAC>
| ReturnType<typeof updateTaskAC>
| AddTodolistActionType 
| RemoveTodolistActionType
| SetTodolistsActionType
| ReturnType<typeof setTasksAC>


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string | null
    status?: TaskStasuses
    priority?: number
    startDate?: string | null
    deadline?: string | null
}