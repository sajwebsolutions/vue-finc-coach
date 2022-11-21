
    export default {
        addRequests(state, payload){
            state.allRequests.push(payload);
        },

        loadRequests(state, payload) {
            state.allRequests   =   payload;
        }
    };