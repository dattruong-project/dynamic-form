import { ValidationRule, Validations } from "../../src";

export const usernameValidation: Validations = {
    emailRequired: {
        value: true,
        message: 'Please Input Email',
        key: ValidationRule.required,
    },   
    validateEmail: {
        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Invalid email address",
        key: ValidationRule.pattern
    },
    emailMinLength: {
        value: 6,
        message: "Username must have at least 6 characters",
        key: ValidationRule.min
    },
    emailMaxLength: {
        value: 15,
        message: "Username must have maximum 15 characters",
        key: ValidationRule.max
    }
}

export const passwordValidation: Validations = {
    passwordRequired: {
        value: true,
        message: 'Please Input Password',
        key: ValidationRule.required,
    }, 
}


