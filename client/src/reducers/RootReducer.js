const initState = {
    value: "",
    payload: "",
    tabIndex: 0,
    tabs: [{index: 0, content: ""}, {index: 1, content: ""}, {index: 2, content: ""}]
}

const rootReducer = (state=initState, action) => {
    var newState = state;
    if(action.type === "SPEAK") {
        newState = {
            ...state,
            value: action.state.value,
            payload: action.payload.value
        };
    }
    return newState;
}

export default rootReducer;
