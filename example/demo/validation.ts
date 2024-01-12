import { ValidateRule, Validations } from "../../src";

export const usernameValidation: Validations = {
    emailRequired: {
        value: true,
        message: 'Please Input Email',
        key: ValidateRule.required,
    },   
    validateEmail: {
        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Invalid email address",
        key: ValidateRule.pattern
    },
    emailMinLength: {
        value: 6,
        message: "Username must have at least 6 characters",
        key: ValidateRule.min
    },
    emailMaxLength: {
        value: 15,
        message: "Username must have maximum 15 characters",
        key: ValidateRule.max
    }
}

export const passwordValidation: Validations = {
    passwordRequired: {
        value: true,
        message: 'Please Input Password',
        key: ValidateRule.required,
    }, 
}


