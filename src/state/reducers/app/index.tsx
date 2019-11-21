export const showState = (state, { payload }) => ({
    ...state,
    state: payload.state,
});
