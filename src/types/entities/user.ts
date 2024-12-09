import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';



export type User = {
    currentUser: CreateUser | LoginUser | AuthProfileResponse | null
    formType: string
}


export type CreateUser = {
    id?: number
    email?: string
    password?: string
    name: string
    avatar: string
}

export type LoginUser = {
    email: string
    password: string
}

export type AuthProfileResponse = {
    access_token: string
}








