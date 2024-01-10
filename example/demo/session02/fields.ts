import { DictionaryComponentType, FormFields } from "../../../src";
import { agreeLicenseId } from "../constants";

const data = [
    {
        label:"Please agree your license",
        value: true
    }
]

export const session02Fields: FormFields = {
    [agreeLicenseId]: {
        id: agreeLicenseId,
        type: DictionaryComponentType.Checkbox,
        data: data,
        meta: {
            defaultValue:  [data[0].value],
        }
    },
}