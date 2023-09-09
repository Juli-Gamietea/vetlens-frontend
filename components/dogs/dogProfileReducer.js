export const initialState = {
    name: "",
    dogBreed: "",
    isNameValid: true,
    isDogBreedValid: true,
    nameErrorMessage: "",
    dogBreedErrorMessage: ""
}

export function dogProfileReducer (state = initialState, action) {
    switch (action.type) {
        case "fieldUpdate":
            return {
                ...state,
                [action.field]: action.value,
                isNameValid: true,
                isDogBreedValid: true
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
       
        case "reset":
            return initialState;
        default:
            return state;
    }
}
