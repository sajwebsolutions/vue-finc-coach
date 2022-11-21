
    export default {
        registerCoach(context, payload){
            const id        =   context.rootGetters.userId;
            const formData  =   {
                firstName: payload.fname,
                lastName: payload.lname,
                areas: payload.areas,
                description: payload.des,
                hourlyRate: payload.rate
            };

            fetch(`https://findcoach-eafe6-default-rtdb.firebaseio.com/coaches/${id}.json?auth=` + context.rootGetters.token, {
                method: 'PUT',
                body: JSON.stringify(formData),
            });

            context.commit('registerCoach', {
                ...formData,
                id: id
            });
        },

        async loadCoaches(context){

            /*------------- GET COACHES -----------------*/

            //Get the coaches from online DB
            const coaches           =   [];
            const data    =  await fetch('https://findcoach-eafe6-default-rtdb.firebaseio.com/coaches.json');
            const coachesResponse         =   await data.json();

            /*Erron handling*/
            if( !data.ok ){
                const error  = new Error(data.message || 'Failed To Fetch');
                throw error;
            }

            for ( const key in coachesResponse )
            {
                coaches.push({
                    id: key,
                    firstName: coachesResponse[key].firstName,
                    lastName: coachesResponse[key].lastName,
                    areas: coachesResponse[key].areas,
                    description: coachesResponse[key].description,
                    hourlyRate: coachesResponse[key].hourlyRate
                });
            }

            //console.log(coachesResponse['c3'].firstName);

            context.commit('setCoaches', coaches);

            /*-------------/GET COACHES -----------------*/

        }
    };