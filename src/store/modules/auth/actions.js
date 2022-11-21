
    export  default {
        async login(context, payload){
            //Signup request to Firebase
            //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKR45H57x8ba5JeiUaOIo5K1G4d_xhMkg
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKR45H57x8ba5JeiUaOIo5K1G4d_xhMkg', {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                }),
            });

            const data  =   await response.json();
            if( !response.ok ){
                console.log(data.error.message);
                const error =   new Error(data.error.message || 'Failed to Login');
                throw error;
            }

            console.log(data);

            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);

            //Commit
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn
            });
        },

        async signup(context, payload){

            //Signup request to Firebase
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKR45H57x8ba5JeiUaOIo5K1G4d_xhMkg', {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                }),
            });

            const data  =   await response.json();
            if( !response.ok ){
                console.log(data.error.message);
                const error =   new Error(data.error.message || 'Failed to Authenticate');
                throw error;
            }

            console.log(data);

            //Commit
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn
            });

        },

        logout(context){

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');


            context.commit('setUser', {
                token: null,
                userId: null,
                tokenExpiration: null
            });
        },

        tryLogin(context){

            const token     =   localStorage.getItem('token');
            const userId    =   localStorage.getItem('userId');

            if( token && userId ){
                context.commit('setUser', {
                    token : token,
                    userId: userId,
                    tokenExpiration: null
                })
            }
        }
    };