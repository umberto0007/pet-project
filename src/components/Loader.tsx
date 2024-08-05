import React, {FC} from 'react';
import {Oval} from 'react-loader-spinner';

const Loader: FC = () => {
    return (
        <div className='flex justify-center pt-36'>
            <Oval
                visible={true}
                height="60"
                width="60"
                color="yellow"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
                secondaryColor="white"
            />
        </div>
    );
};

export default Loader;