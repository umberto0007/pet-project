export type CreateUser = {
    email?: string
    password?: string
    name?: string
    avatar?: string
}

export type LoginUser = {
    email?: string
    password?: string
}

export type AuthProfileResponse = {
    access_token: string
}

export type User = {
    currentUser: CreateUser | LoginUser | AuthProfileResponse | null
    formType: string
}


