import { doublePasswordId, passwordId, session01Id, usernameId } from "../constants";

export const session01 = {
     [session01Id]: {
        fieldsById: [usernameId, passwordId, doublePasswordId],
        id: session01Id,
        submit: {
            label: 'onClick',
        },
        meta: {
            tab: {
                label: "Session 01"
            }
        },
        // hiddenButton: true,
        gutter: 12
    }
}