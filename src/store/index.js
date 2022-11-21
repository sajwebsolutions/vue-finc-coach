
    import { createStore } from "vuex";
    import CoachesModule from "@/store/modules/coaches/index";
    import RequestsModule from "@/store/modules/requests/index";
    import AuthModule from "@/store/modules/auth/index";

    const store         =           createStore({

        modules: {
             coaches: CoachesModule,
             requests: RequestsModule,
             auth: AuthModule,
        },


    });

    export default store;