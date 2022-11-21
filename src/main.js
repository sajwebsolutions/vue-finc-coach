
    //Main Vue Package
    import { createApp } from 'vue'

    //Custom Routes file - Router included
    import router from "@/router";

    //Vuex - Import
    import store from "@/store/index";

    //Default App Component
    import App from './App.vue'

    //Base Card
    import BaseCard from "@/components/ui/BaseCard"

    //Base Button
    import BaseButton from "@/components/ui/BaseButton"

    //Base Badge
    import BaseBadge from "@/components/ui/BaseBadge";

    //Loading spinner
    import BaseSpinner from "@/components/ui/BaseSpinner";

    //Base Spinner
    import BaseDialog from "@/components/ui/BaseDialog";

    //Create App
    const app       =       createApp(App);

    //Use Routes File in App
    app.use(router);

    //Use Store
    app.use(store);

    //Register BaseCard
    app.component('base-card', BaseCard);
    app.component('base-button', BaseButton);
    app.component('base-badge', BaseBadge);
    app.component('base-spinner', BaseSpinner);
    app.component('base-dialog', BaseDialog);

    //Mount App in Div
    app.mount('#app');
