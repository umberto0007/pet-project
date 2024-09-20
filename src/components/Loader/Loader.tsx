import React, {FC} from 'react';

import {Oval} from 'react-loader-spinner';

const Loader: FC = () => {
    return (
        <div className='flex justify-center pt-36'>
            <Oval
                visible={true}
                height="60"
                width="60"
                color="red"
                ariaLabel="oval-loading"
                secondaryColor="gray"
            />
        </div>
    );
};

export default Loader;