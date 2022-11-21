
    export default {
        requests(state, getters, rootState, rootGetters){
            const getRequests   =   state.allRequests;
            const userId        =   rootGetters.userId;

            return getRequests.filter( (req) => req.coachId === userId );
        },

        hasRequests(state){
            return state.allRequests && state.allRequests.length > 0;
        }
    };