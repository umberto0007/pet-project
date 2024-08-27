import React, { ReactElement} from 'react';
import {RequireType} from '../models/proporties.types';


const Wrapper = ({children}: RequireType): ReactElement => {
    return (
        <div className='min-h-screen flex flex-col'>
            {children}
        </div>
    );
};

export default Wrapper;