
    /*=======================================*/
    /*                                       */
    /*               ROUTES                  */
    /*                                       */
    /*=======================================*/

    import { createRouter, createWebHistory } from 'vue-router';

    //Coaches Components
    import CoachesList from "@/components/coaches/CoachesList"
    import CoacheDetail from "@/components/coaches/CoachDetails"
    import CoachRegistration from "@/components/coaches/CoachRegistration"
    import ContactCoach from "@/components/requests/ContactCoach"
    import store from "@/store/index";

    //Requests Components
    import RequestsReceived from "@/components/requests/RequestsReceived"

    //Not Found
    import NotFound from "@/components/pages/NotFound"

    //Auth
    import UserAuth from "@/components/pages/auth/UserAuth";

    //Routes - Separately defined
    const routes            =           [

        {
            path:       '/',
            redirect:   '/coaches'
        },

        {
            path:       '/coaches',
            component:  CoachesList
        },

        {
            path:       '/coaches/:id',
            component:  CoacheDetail,
            props: true,
            children:   [
                {
                    path:       'contact',
                    component:  ContactCoach
                }
            ]
        },

        {
            path:       '/register',
            component:  CoachRegistration,
            meta:       {
                requiresAuth: true
            }
        },

        {
            path:       '/requests',
            component:  RequestsReceived,
            meta:       {
                requiresAuth: true
            }
        },

        {
            path:       '/auth',
            component:  UserAuth,
            meta:       {
                requiresUnAuth: true
            }
        },

        {
            path:       '/:notFound(.*)',
            component:  NotFound
        },
    ];

    const router            =           createRouter({
        history:                        createWebHistory(),
        routes:                         routes,
    });

    //Global navigation route
    router.beforeEach(function(to, _, next){
        if( to.meta.requiresAuth &&  !store.getters.isAuthenticated){
            next("/auth");
        }
        else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
            next("/coaches");
        }
        else{
            next();
        }
    });

    export default router;



    /*=======================================*/
    /*                                       */
    /*           END ROUTES                  */
    /*                                       */
    /*=======================================*/