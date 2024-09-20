import React from 'react';

// @ts-ignore
const Modal = ({active, setActive, children}) => {
    return (
        <div
            className={`${active ? 'active [&.active]: opacity-100  pointer-events: all' : 'opacity-0 pointer-events-none'} z-10 h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex items-center justify-center transition-[0.5s] left-0 top-0`}
            onClick={() => setActive(false)}>
            <div
                className={`${active ? 'active [&.active]: scale-100' : 'scale-50'} bg-[white] transition-[0.4s] duration-[all] w-[50vw] p-5 rounded-xl`}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;