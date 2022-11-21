<template>
    <section>
        <base-card>
            {{ fullName }}
            <h3>${{ rate }}/hour</h3>
        </base-card>
    </section>

    <section>
        <base-card>
            <header>
                <h2>Interested? Reach out now!</h2>
                <router-view></router-view>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in areas" :key="area" :type="area" :text="area"></base-badge>
            <p>{{ description }}</p>
        </base-card>
    </section>
</template>

<script>
    export default {
        data(){
           return {
               selectedCoach: null
           };
        },

        props: ['id'],

        created() {
            this.selectedCoach     =       this.$store.getters['coaches/coaches'].find( (coach) => coach.id === this.id );
        },

        computed: {

            fullName(){
                return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
            },

            rate(){
                return this.selectedCoach.hourlyRate;
            },

            contactLink(){
                return this.$route.path + "/" + this.id + "/contact";
            },

            areas(){
                return this.selectedCoach.areas;
            },

            description(){
                return this.selectedCoach.description;
            },

        },
    };
</script>