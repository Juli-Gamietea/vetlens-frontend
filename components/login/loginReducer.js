export const initialState = {
    username: "",
    password: "",
    isUsernameValid: true,
    isPasswordValid: true,
    userErrorMessage: "",
    passwordErrorMessage: "",
}

export function loginReducer (state = initialState, action) {
    switch (action.type) {
        case "fieldUpdate":
            return {
                ...state,
                [action.field]: action.value,
                isUsernameValid: true,
                isPasswordValid: true
            };
        case "usernameError":
            return {
                ...state,
                isUsernameValid: false,
                userErrorMessage: action.error
            };
        case "passwordError":
            return {
                ...state,
                isPasswordValid: false,
                passwordErrorMessage: action.error
            };
        case "reset":
            return initialState;
        default:
            return state;
    }
}