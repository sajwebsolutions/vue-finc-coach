<template>

    <base-dialog :show="!!isError" title="Request Error" @close="handleError">
        <p>
            {{ isError }}
        </p>
    </base-dialog>

    <section>
        <base-card>
            <header>
                <h2>Requests Received</h2>
            </header>

            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>

            <!--Requests List-->
            <ul v-if="hasRequests && !isLoading">
                <request-item v-for="request in requestsRecieved"
                              :key="request.id"
                              :email="request.email"
                              :message="request.message">
                </request-item>
            </ul>

            <h3 v-if="!hasRequests">You havn't received any requests yet!</h3>

        </base-card>
    </section>
</template>

<script>

    import RequestItem from "./RequestItem";

    export default {
        components: {
            RequestItem
        },

        data(){
            return {
                isLoading: false,
                isError: null
            };
        },

        created() {
            this.loadRequests();
        },

        computed: {
            requestsRecieved(){
                return this.$store.getters["requests/requests"];
            },

            hasRequests(){
                return this.$store.getters["requests/hasRequests"];
            },
        },

        methods: {
            async loadRequests(){

                this.isLoading = true;
                try{
                    await this.$store.dispatch("requests/loadRequests");
                }catch(e){
                    this.isError    =   e.message || 'Failed to Load Requests';
                }
                this.isLoading = false;
            },

            handleError(){
                this.isError = null;
            }
        },
    };
</script>


<style scoped>
    header {
        text-align: center;
    }

    ul {
        list-style: none;
        margin: 2rem auto;
        padding: 0;
        max-width: 30rem;
    }

    h3 {
        text-align: center;
    }
</style>