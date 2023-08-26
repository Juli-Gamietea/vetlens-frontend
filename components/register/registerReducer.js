export const initialState = {
    firstname: "",
    lastname: "",
    email:"",
    username: "",
    password: "",
    rePassword: "",
    isFirstnameValid: true,
    isLastnameValid: true,
    isEmailValid: true,
    isUsernameValid: true,
    isPasswordValid: true,
    isRePasswordValid: true,
    firstnameErrorMessage: "",
    lastnameErrorMessage: "",
    emailErrorMessage: "",
    usernameErrorMessage: "",
    passwordErrorMessage: "",
    rePasswordErrorMessage: ""
}

export function registerReducer (state = initialState, action) {
    switch (action.type) {
        case "fieldUpdate":
            return {
                ...state,
                [action.field]: action.value,
                isFirstnameValid: true,
                isLastnameValid: true,
                isEmailValid: true,
                isUsernameValid: true
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
        case "usernameError":
            return {
                ...state,
                isUsernameValid: false,
                usernameErrorMessage: action.error
            };
        case "passwordError":
            return {
                ...state,
                isPasswordValid: false,
                passwordErrorMessage: action.error
            };
        case "rePasswordError":
            return {
                ...state,
                isRePasswordValid: false,
                rePasswordErrorMessage: action.error
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

export const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(emailRegex.test(email)){
        return true;
    }else{
        return false;
    }
}
export default validateEmail