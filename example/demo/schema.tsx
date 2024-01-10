import { FormSchema } from "../../src"
import { session01Id, session02Id } from "./constants"
import { session01Fields } from "./session01/fields"
import { session01 } from "./session01"
import { session02Fields } from "./session02/fields"
import { session02 } from "./session02"

export const schema: FormSchema = {
    fields: {
        ...session01Fields,
        ...session02Fields
    },
    sessions: {
        ...session01,
        ...session02,
    },
    sessionsById: [session01Id,session02Id]
}