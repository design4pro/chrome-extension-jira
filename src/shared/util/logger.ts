const debugInfo = true;
const debugError = true;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (id: string, text: string, ...args: any): void => {
    if (debugInfo) {
        args = args || [];
        console.log(id, (new Date() + '').split(' ')[4], text, ...args);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const warn = (id: string, text: string, ...args: any): void => {
    if (debugError) {
        args = args || [];
        const ignores = ['Error', 'gsUtils', 'gsMessages'];
        const errorLine = getStackTrace()
            .split('\n')
            .filter((o) => !ignores.find((p) => o.indexOf(p) >= 0))
            .join('\n');
        args.push(`\n${errorLine}`);
        console.log('WARNING:', id, (new Date() + '').split(' ')[4], text, ...args);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const error = (id: string, errorObj: any, ...args: any): void => {
    if (errorObj === undefined) {
        errorObj = id;
        id = '?';
    }
    //NOTE: errorObj may be just a string :/
    if (debugError) {
        const stackTrace = Object.prototype.hasOwnProperty.call(errorObj, 'stack') ? errorObj.stack : getStackTrace();
        const errorMessage = Object.prototype.hasOwnProperty.call(errorObj, 'message')
            ? errorObj.message
            : typeof errorObj === 'string'
            ? errorObj
            : JSON.stringify(errorObj, null, 2);
        errorObj = errorObj || {};
        console.log(id, (new Date() + '').split(' ')[4], 'Error:');
        console.error(getPrintableError(errorMessage, stackTrace, ...args));
    } else {
        // const logString = errorObj.hasOwnProperty('stack')
        //   ? errorObj.stack
        //   : `${JSON.stringify(errorObj)}\n${gsUtils.getStackTrace()}`;
        // gsAnalytics.reportException(logString, false);
    }
};

// Puts all the error args into a single printable string so that all the info
// is displayed in chrome://extensions error console
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPrintableError = (errorMessage: string, stackTrace: any, ...args: any): string => {
    let errorString = errorMessage;
    errorString += `\n${args.map((o) => JSON.stringify(o, null, 2)).join('\n')}`;
    errorString += `\n${stackTrace}`;

    return errorString;
};

const getStackTrace = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {};

    Error.captureStackTrace(obj, getStackTrace);

    return obj.stack;
};
