import { FormSessions } from "../../../src";
import { doublePasswordId, passwordId, session01Id, usernameId } from "../constants";

export const session01: FormSessions = {
     [session01Id]: {
        id: session01Id,
        submit: {
            label: 'onClick',
        },
        meta: {
            tab: {
                label: "Session 01"
            }
        },
        fieldsById: [usernameId, passwordId, doublePasswordId]
    }
}