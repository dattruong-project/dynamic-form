import { DictionaryComponentType, FormFields, ValidationRule } from "../../../src";
import { usernameId, passwordId, doublePasswordId, validationEqualId } from "../constants";
import { passwordValidation, usernameValidation } from "../validation";

export const session01Fields: FormFields = {
    [usernameId]: {
        id: usernameId,
        type: DictionaryComponentType.Input,
        data: "abc@gmail.com",
        meta: {
            placeholder: 'Username'
        },
        validation: usernameValidation,
    },
    [passwordId]: {
        id: passwordId,
        type: DictionaryComponentType.Input,
        meta: {
            placeholder: 'Password',
        },
        validation: passwordValidation
    },
    [doublePasswordId]: {
        id: doublePasswordId,
        type: DictionaryComponentType.Input,
        meta: {
            placeholder: 'Again Password',
        },
        dependsOn: [passwordId],
        validation: {
            [validationEqualId]: {
                key: validationEqualId,
                message: 'Password does not match',
                meta: {
                    relatedTo: passwordId
                }
            }
        }
    },
}