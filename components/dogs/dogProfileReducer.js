export const initialState = {
    name: "",
    dogBreed: "",
    birthDate:"",
    isNameValid: true,
    isDogBreedValid: true,
    isBirthDateValid: true,
    nameErrorMessage: "",
    dogBreedErrorMessage: "",
    birthDateErrorMessage: ""
}

export function dogProfileReducer (state = initialState, action) {
    switch (action.type) {
        case "fieldUpdate":
            return {
                ...state,
                [action.field]: action.value,
                isNameValid: true,
                isDogBreedValid: true,
                isBirthDateValid: true
            };
        case "nameError":
            return {
                ...state,
                isNameValid: false,
                nameErrorMessage: action.error
            };
        case "dogBreedError":
            return {
                ...state,
                isDogBreedValid: false,
                dogBreedErrorMessage: action.error
            };
        case "birthDateError":
            return {
                ...state,
                isBirthDateValid: false,
                birthDateErrorMessage: action.error
            };
        case "reset":
            return initialState;
        default:
            return state;
    }
}
