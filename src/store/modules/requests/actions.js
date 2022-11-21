
    export default {
        async contactCoach(context, payload){
            const newRequest    =   {
                //id: new Date().toISOString(),
                //coachId: payload.coachId,
                email: payload.email,
                message: payload.msg
            };

            /*   Saving Data to Firebase   */
            const response  =   await fetch(`https://findcoach-eafe6-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
                method: 'POST',
                body: JSON.stringify(newRequest)
            });

            //Json Response
            const responseData  =   await response.json();

            //Response
            if( !response.ok ){
                const error     =   new Error(responseData.message || 'Failed to send Request');
                throw error;
            }

            //Automatic generated id by Firebase in 'name' prop - Add that id in 'newRequest'
            newRequest.id       =   responseData.name;
            newRequest.coachId  =   payload.coachId;


            /*END - Saving Data to Firebase*/


            context.commit('addRequests', newRequest);
        },

        //loadRequests
        async loadRequests(context){
            const userId    =   context.rootGetters.userId;
            const response  =   await fetch(`https://findcoach-eafe6-default-rtdb.firebaseio.com/requests/${userId}.json?auth=` +context.rootGetters.token);
            const resData   =   await response.json();

            if( !response.ok ){
                const error = new Error(resData.message || 'Failed to Load Requests');
                throw error;
            }

            const requests  =   [];

            //Loop all the requests for given id
            for (const key in resData)
            {
                requests.push({
                    id: key,
                    coachId: userId,
                    email: resData[key].email,
                    message: resData[key].message
                });
            }

            //Commit
            context.commit('loadRequests', requests);
        }
    };