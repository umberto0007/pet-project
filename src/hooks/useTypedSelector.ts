import {TypedUseSelectorHook, useSelector} from 'react-redux';

import {RootState} from 'src/redux/features/redusers';



export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector