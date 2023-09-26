export const initialState = {
    firstname: "",
    lastname: "",
    email:"",
    username: "",
    password: "",
    newPassword: "",
    isFirstnameValid: true,
    isLastnameValid: true,
    isEmailValid: true,
    isUsernameValid: true,
    isPasswordValid: true,
    isNewPasswordValid: true,
    firstnameErrorMessage: "",
    lastnameErrorMessage: "",
    emailErrorMessage: "",
    usernameErrorMessage: "",
    passwordErrorMessage: "",
    newPasswordErrorMessage: ""
}

export function profileReducer (state = initialState, action) {
    switch (action.type) {
        case "fieldUpdate":
            return {
                ...state,
                [action.field]: action.value,
                isFirstnameValid: true,
                isLastnameValid: true,
                isEmailValid: true,
                isUsernameValid: true,
                isPasswordValid: true,
                isNewPasswordValid: true
            };
        case "firstnameError":
            return {
                ...state,
                isFirstnameValid: false,
                firstnameErrorMessage: action.error
            };
        case "lastnameError":
            return {
                ...state,
                isLastnameValid: false,
                lastnameErrorMessage: action.error
            };
        case "emailError":
            return {
                ...state,
                isEmailValid: false,
                emailErrorMessage: action.error
            };
        case "passwordError":
            return {
                ...state,
                isPasswordValid: false,
                passwordErrorMessage: action.error
            };
        case "newPasswordError":
            return {
                ...state,
                isNewPasswordValid: false,
                newPasswordErrorMessage: action.error
            };
        
        case "emailSyntaxError":
            return {
                ...state,
                isEmailValid: false,
                emailErrorMessage: action.error
            }
       
        case "reset":
            return initialState;
        default:
            return state;
    }
}
