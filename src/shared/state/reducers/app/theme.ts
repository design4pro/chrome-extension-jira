// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setTheme = (state: any, { payload }) => ({
    ...state,
    theme: payload.theme,
});
