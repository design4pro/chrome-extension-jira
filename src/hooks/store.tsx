import { useContext } from 'react';
import StateContext from 'state/store/context';

export const useStore = () => useContext(StateContext);
