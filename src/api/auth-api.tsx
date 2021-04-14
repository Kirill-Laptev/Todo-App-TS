import { instance } from './settings'

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type LoginResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
      userId: number
    }
}

export const authAPI = {
    login: (authData: LoginParamsType) => {
        return instance.post<LoginResponseType>('/auth/login', authData)
    }
}