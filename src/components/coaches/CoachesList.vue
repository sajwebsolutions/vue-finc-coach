    <template>
        <base-dialog :show="!!error" title="An Error Occurred" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @update-filter="applyFilters"></coach-filter>
        </section>

        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                    <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">Login to Register as a Coach</base-button>
                    <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register a Coach</base-button>
                </div>

                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>

                <ul v-if="hasCoaches">
                    <coach-item v-for="coach in filteredCoaches"
                                :key="coach.id"
                                :id="coach.id"
                                :first-name="coach.firstName"
                                :last-name="coach.lastName"
                                :rate="coach.hourlyRate"
                                :areas="coach.areas">
                    </coach-item>
                </ul>
                <h3 v-else>No Coaches Found</h3>
            </base-card>
        </section>
    </template>

    <script>

        import CoachItem from "./CoachItem";
        import BaseButton from "../ui/BaseButton";
        import CoachFilter from "./CoachFilter";

        export default {
            data(){
                return {
                    isLoading: false,
                    error: null,
                    activeFilters : {
                        frontend: true,
                        backend:true,
                        career: true,
                    },
                };
            },

            components: {
                BaseButton,
                CoachItem,
                CoachFilter
            },

            created() {
                this.loadCoaches();
            },

            computed: {
                isCoach(){
                    return this.$store.getters["coaches/isCoach"];
                },

                filteredCoaches(){
                    const coaches   =   this.$store.getters['coaches/coaches'];
                    return coaches.filter( (coach)  => {
                        if( this.activeFilters.frontend && coach.areas.includes('frontend') )
                        {
                            return true;
                        }

                        if( this.activeFilters.backend && coach.areas.includes('backend') )
                        {
                            return true;
                        }

                        if( this.activeFilters.career && coach.areas.includes('career') )
                        {
                            return true;
                        }

                        return false;
                    });
                },

                hasCoaches() {
                    return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
                },

                isLoggedIn(){
                  return this.$store.getters.isAuthenticated;
                },
            },

            methods: {
                applyFilters(updatedFilters){
                    this.activeFilters  =   updatedFilters;
                },

                async loadCoaches() {
                    this.isLoading = true;
                    try{
                        await this.$store.dispatch('coaches/loadCoaches');
                    }catch (e) {
                        this.error = e.message || 'Something went wrong';
                    }
                    this.isLoading = false;
                    //console.log(this.isLoading);
                },

                handleError(){
                    this.error = null;
                }
            },
        };
    </script>

    <style scoped>
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .controls {
            display: flex;
            justify-content: space-between;
        }
    </style>