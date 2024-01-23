import {DictionaryComponentType, FormFields } from "../../../src";
import { usernameId, passwordId, doublePasswordId } from "../constants";
import {passwordValidation, usernameValidation } from "../validation";

export const session01Fields: FormFields = {
        [usernameId]: {
            id: usernameId,
            type: DictionaryComponentType.Input,
            data: "abc@gmail.com",
            meta: {
                placeholder: "Username"
            },
            validation: usernameValidation
        },
        [passwordId]: {
            id: passwordId,
            type: DictionaryComponentType.Input,
            meta: {
                placeholder: "Password",
            },
            validation: passwordValidation
        },
        [doublePasswordId]: {
            id: doublePasswordId,
            dependsOn: [passwordId],
            type: DictionaryComponentType.Input,
            meta: {
                placeholder: "Again Password",
            }
        }
}