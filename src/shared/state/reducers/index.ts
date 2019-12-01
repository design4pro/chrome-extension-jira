import AppReducers from './app';

export type Type = {
    readonly type: string;
};

export type Payload<T> = {
    readonly payload: T;
};

export type Action<T> = Type & Payload<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReducer = (handlers: any) => (state, action: Action<any>) => {
    if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
        return state;
    }

    return handlers[action.type](state, action);
};

export default createReducer({
    ...AppReducers,
});
