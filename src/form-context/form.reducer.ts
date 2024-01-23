
import { FormSchema } from '../form-builder/types';
import { FieldValues } from '../form-controller';
import { INIT_FORM, NEXT_SESSION, NOTIFY_ERROR, PREVIOUS_SESSION, RESET_FORM, SET_SESSION, UPDATE_FORM_DATA } from './form.actions';

export interface DefaultFormState {
    [key: string]: {
        sessionsCount: number;
        isLastSession: boolean;
        currentSessionIndex: number;
        data: FieldValues;
    };
}

export interface FormAction {
    type: string;
    formId: string;
    data?: {
        [key: string]: unknown;
    };
    error?: {
        [key: string]: unknown;
    };
    schema?: FormSchema;
    [key: string]: unknown;
}

const defaultFormState = {
    sessionsCount: 1,
    isLastSession: true,
    currentSessionIndex: 0,
    data: {},
};

const DEFAULT_OBJECT = {} as const;
export const initialState = {} as DefaultFormState;

const checkFormId = ({ formId }: FormAction) => !!formId;
export const reducer = (state = initialState, action: FormAction) => {
    if (!checkFormId(action)) {
        return state;
    }

    switch (action.type) {
        case INIT_FORM: {
            const sessionsById = action?.schema?.sessionsById || ([] as string[]);
            const currentFormState = {
                ...defaultFormState,
                sessionsCount: sessionsById.length,
                isLastSession: sessionsById.length === 1,
            };
            return {
                ...state,
                [action.formId]: currentFormState,
            };
        }

        case NEXT_SESSION: {
            const formState = state?.[action.formId] || DEFAULT_OBJECT;
            const currentSessionIndex = state?.[action.formId]?.currentSessionIndex || 0;
            const sessionsCount = state?.[action.formId]?.sessionsCount || 1;
            const newSessionIndex = currentSessionIndex >= sessionsCount - 1 ? sessionsCount - 1 : currentSessionIndex + 1;
            return {
                ...state,
                [action.formId]: {
                    ...formState,
                    isLastSession: sessionsCount === newSessionIndex + 1,
                    currentSessionIndex: newSessionIndex,
                },
            };
        }

        case UPDATE_FORM_DATA: {
            const formState = state?.[action.formId];

            if (!formState) return state;
            return {
                ...state,
                [action.formId]: {
                    ...formState,
                    data: {
                        ...formState.data,
                        ...action.data,
                    },
                },
            };
        }

        case NOTIFY_ERROR: {
            const formState = state?.[action.formId];

            if (!formState) return state;

            return {
                ...state,
                [action.formId]: {
                    ...formState,
                    error: {
                        ...formState.data,
                        ...action.error,
                    },
                },
            };
        }

        case RESET_FORM: {
            const formState = state?.[action.formId];
            return {
                ...state,
                [action.formId]: {
                    ...formState,
                    data: {},
                },
            };
        }
        
        case PREVIOUS_SESSION: {
            if (!checkFormId(action)) {
                return state;
            }
            const formState = state?.[action.formId] || DEFAULT_OBJECT;
            const currentSessionIndex = state?.[action.formId]?.currentSessionIndex || 0;
            const sessionsCount = state?.[action.formId]?.sessionsCount || 1;
            const newSessionIndex = currentSessionIndex <= 0 ? 0 : currentSessionIndex - 1;

            return {
                ...state,
                [action.formId]: {
                    ...formState,
                    isLastSession: sessionsCount === newSessionIndex + 1,
                    currentSessionIndex: newSessionIndex,
                },
            };
        }

        case SET_SESSION: {
            const newSessionIndex = typeof action.sessionIndex === 'number' ? action.sessionIndex : 0;
            const sessionsCount = state?.[action.formId]?.sessionsCount || 1;

            const formState = state?.[action.formId] || DEFAULT_OBJECT;

            return {
                ...state,
                [action.formId]: {
                    ...formState,
                    isLastSession: sessionsCount === newSessionIndex + 1,
                    currentSessionIndex: newSessionIndex % sessionsCount,
                },
            };
        }
        default:
            return state;
    }
};