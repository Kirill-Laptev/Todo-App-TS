import { instance } from './settings'
import { ResponseType } from './todolists-api'

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login: (authData: LoginParamsType) => {
        return instance.post<ResponseType<{userId: number}>>('/auth/login', authData)
    },
    authMe: () => {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me')
    }
}