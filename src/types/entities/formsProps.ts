import React, {ReactNode} from 'react';
import {CreateUser} from '#types/entities/user';


type ToggleForm = (type: string) => void

export type FormsProps = {
    active?: boolean
    setActive?: React.Dispatch<React.SetStateAction<boolean>>
    toggleCurrentFormType?: ToggleForm
    children?: ReactNode
    handleClick?: () => void
    values?: CreateUser
}