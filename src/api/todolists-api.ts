import axios from 'axios'

const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': '1e60f3eb-a2f7-4f18-b8e9-f6ea4b15f04b'
    }
}

const instance = axios.create(settings)


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export enum TaskStasuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4 
}

export type TaskItemType = {
    description: string | null
    title: string
    status: TaskStasuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}


// Для GET и PUT
export type TasksResponseType = {
    error: null | string
    totalCount: number
    items: Array<TaskItemType>
}

export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: TaskStasuses
    priority: number
    startDate: string | null
    deadline: string | null
}


export const todolistsAPI = {
    getTodolists: () => {
        return instance.get<Array<TodolistType>>('/todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title})   
    },
    updateTodolist: (todoListId: string, title: string) => {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
    },
    deleteTodolist: (todoListId: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    createTask: (todoListId: string, title: string) => {
        return instance.post<ResponseType<{item: TaskItemType}>>(`/todo-lists/${todoListId}/tasks`, {title}) 
    },
    getTasks: (todoListId: string) => {
        return instance.get<TasksResponseType>(`/todo-lists/${todoListId}/tasks`)  
    },
    updateTask: (todoListId: string, taskID: string, model: UpdateTaskModelType) => {
        return instance.put<TasksResponseType>(`/todo-lists/${todoListId}/tasks/${taskID}`, model) 
    },
    deleteTask: (todoListId: string, taskID: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskID}`)   
    }
}