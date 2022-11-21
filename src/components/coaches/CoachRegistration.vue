<template>
    <section>
        <base-card>
            <h2>Registe As a Coach now!</h2>
            <coach-form @save-data="saveData"></coach-form>
        </base-card>
    </section>
</template>

<script>

    import CoachForm from "./CoachForm";

    export default {
        components: {
            CoachForm
        },

        methods: {
            saveData(formData){
                this.$store.dispatch("coaches/registerCoach", formData);

                //Redirect / Back /
                //this.$router.push('/coaches') // using this will be able to go back to previous page

                this.$router.replace('/coaches'); //Will NOT be able to go back
            }
        }
    };
</script>