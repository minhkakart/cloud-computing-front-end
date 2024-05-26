const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload,
            };
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}

export { initialState };
export default reducer;
