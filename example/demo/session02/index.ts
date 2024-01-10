import { FormSessions } from "../../../src";
import { agreeLicenseId, session01Id, session02Id } from "../constants";

export const session02: FormSessions = {
     [session02Id]: {
        fieldsById: [agreeLicenseId],
        id: session01Id,
        submit: {
            label: 'Finish',
        },
        meta: {
            tab: {
                label: "Session 02",
                disabled: true
            }
        },
        gutter: 16
    }
}