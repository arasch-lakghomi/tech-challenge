export type Message = {
    event: 'sendRequest' | 'sendResponse' | 'GetById' | 'sendMap',
    payload: {
        id?: number,
        request?: string,
        response?: string
    }
};