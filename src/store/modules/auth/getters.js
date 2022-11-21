
    export default {
        userId(state){
            return state.userId;
        },

        token(state){
            return state.token;
        },

        isAuthenticated(state){
            //alert(state.token);
            return !!state.token;
        },
    };