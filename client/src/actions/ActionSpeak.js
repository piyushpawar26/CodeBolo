const actionSpeak = (state, speech) => {
    return (dispatch, getState) => {
        fetch("http://localhost:4000/speak",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   speech
                })
            }
        )
        .then(res => res.json())
        .then(result => dispatch({
            type: "SPEAK",
            payload: result,
            state
        }))
        .catch(err => console.log(err));
    }
}

export default actionSpeak;
