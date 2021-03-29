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

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
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
    todolistID: string
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
    status: number
    priority: number
    startDate: number | null
    deadline: number | null
}


export const todolistsAPI = {
    getTodolists: () => {
        return instance.get<Array<TodolistType>>('/todo-lists')
        .then((response) => response.data)
    },
    createTodolist: (title: string) => {
        return instance.post<ResponseType<{items: TodolistType}>>('/todo-lists', {title})
        .then((response) => response.data)
    },
    updateTodolist: (todolistID: string, title: string) => {
        return instance.put(`/todo-lists/${todolistID}`, {title})
        .then((response) => response.data) //
    },
    deleteTodolist: (todolistID: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}`)
        .then((response) => response.data)
    },
    createTask: (todolistID: string, title: string) => {
        return instance.post<ResponseType<TaskItemType>>(`/todo-lists/${todolistID}/tasks`, {title})
        .then((response) => response.data)
    },
    getTasks: (todolistID: string) => {
        return instance.get<TasksResponseType>(`/todo-lists/${todolistID}/tasks`)
        .then((response) => response.data)
    },
    updateTaskTitle: (todolistID: string, taskID: string, model: UpdateTaskModelType) => {
        return instance.put<TasksResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`, model)
        .then((response) => response.data)
    },
    deleteTask: (todolistID: string, taskID: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
        .then((response) => response.data)
    }
}