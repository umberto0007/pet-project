import React, {ReactNode} from 'react';

export type ActiveProps = {
    active: boolean
    setActive:  React.Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
}