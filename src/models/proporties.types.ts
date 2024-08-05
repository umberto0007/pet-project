import React from 'react';

export type ArrowProps = Partial<{
    className: string,
    style: React.CSSProperties,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}>

export type RequireType = {
    children?: React.ReactElement | React.ReactElement[];
}

export type Amount = {
    amount: number
}

