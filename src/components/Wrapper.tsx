import React, {ReactElement} from 'react';

interface RequireType {
    children?: React.ReactElement| React.ReactElement[];
}


const Wrapper = ({children}: RequireType): ReactElement => {
    return (
        <div className='min-h-screen flex flex-col'>
            {children}
        </div>
    );
};

export default Wrapper;