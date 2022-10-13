import {Dispatch} from 'react';
import {applyMiddleware} from 'redux';

import {createStore} from 'react-hooks-global-state';


type State = {
    authToken: string;
    authRole: string;
    user: object;
};

type Action =
    | { type: 'setAuthToken'; authToken: string }
    | { type: 'setAuthRole'; authRole: string }
    | { type: 'setUser'; user: object };

const defaultState: State = {
    authToken: "",
    authRole: "",
    user: {},

};

const LOCAL_STORAGE_KEY = 'my_local_storage_key';
const parseState = (str: string | null): State | null => {
    try {
        const state = JSON.parse(str || '');
        if (typeof state.user !== 'object') throw new Error();
        if (typeof state.authToken !== 'string') throw new Error();
        if (typeof state.authRole !== 'string') throw new Error();

        return state as State;
    } catch (e) {
        return null;
    }
};
const stateFromStorage = parseState(localStorage.getItem(LOCAL_STORAGE_KEY));
const initialState: State = stateFromStorage || defaultState;

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'setAuthToken':
            return {
                ...state,
                authToken: action.authToken
            };
        case 'setAuthRole':
            return {
                ...state,
                authRole: action.authRole
            };
        case 'setUser':
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};

const saveStateToStorage = (
    {getState}: { getState: () => State },
) => (next: Dispatch<Action>) => (action: Action) => {
    const returnValue = next(action);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(getState()));
    return returnValue;
};

export const {dispatch, useStoreState} = createStore(
    reducer,
    initialState,
    applyMiddleware(saveStateToStorage),
);