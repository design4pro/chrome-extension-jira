import { Dispatch, Reducer, ReducerAction, ReducerState, useEffect, useReducer } from 'react';
import { useStorageListener, useStorageReader, useStorageWriter } from './storage';

const INTERNAL_SET_ACTION_TYPE = Symbol('INTERNAL_SET_ACTION_TYPE');

interface InternalSetAction<S> {
    type: typeof INTERNAL_SET_ACTION_TYPE;
    payload: S;
}

const createInternalSetAction = <S>(payload: S): InternalSetAction<S> => ({
    type: INTERNAL_SET_ACTION_TYPE,
    payload,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isInternalSetAction = <S>(action: any): action is InternalSetAction<S> =>
    action && action.type === INTERNAL_SET_ACTION_TYPE;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStorageReducer = <R extends Reducer<any, any>, I>(reducer: R) => (
    prevState: ReducerState<R>,
    action: I | InternalSetAction<ReducerState<R>>
): ReducerState<R> => (isInternalSetAction(action) ? action.payload : reducer(prevState, action));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUseStorageReducer = (storage: Storage) => <R extends Reducer<any, any>, I>(
    key: string,
    reducer: R,
    initializerArg: I & ReducerState<R>,
    initializer?: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>, Error | undefined] => {
    const storageReducer = createStorageReducer<R, I>(reducer);
    const storageInitializerArg = useStorageReader(storage, key, initializerArg);
    const [state, dispatch] = initializer
        ? useReducer(storageReducer, storageInitializerArg, initializer)
        : useReducer(storageReducer, storageInitializerArg);

    const writeError = useStorageWriter(storage, key, state);
    useStorageListener<ReducerState<R>>(key, (newValue) => {
        dispatch(createInternalSetAction(newValue));
    });

    useEffect(() => {
        dispatch(createInternalSetAction(initializer ? initializer(storageInitializerArg) : storageInitializerArg));
    }, [key, dispatch, initializer, storageInitializerArg]);

    return [state, dispatch, writeError];
};

export default createUseStorageReducer;
