import React from 'react';

export type ArrowProps = Partial<{
    className: string,
    style: React.CSSProperties,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}>