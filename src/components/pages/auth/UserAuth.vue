<template>
    <div>
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>

        <base-dialog fixed :show="isLoading" title="Processing..">
            <base-spinner></base-spinner>
        </base-dialog>

        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model="email">
                </div>

                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="text" id="password" v-model="password">
                </div>

                <p v-if="!formIsValid">Check errors (password at-least 6)</p>

                <base-button>{{ submitBtnCaption}}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchCaption }}</base-button>
            </form>
        </base-card>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                email: '',
                password: '',
                formIsValid: true,
                mode: 'login',
                error: null,
                isLoading: false
            };
        },

        computed: {

            submitBtnCaption(){
                if( this.mode === 'login' ){
                    return 'Login';
                }else{
                    return  "Signup";
                }
            },

            switchCaption(){
                if( this.mode === 'login' ){
                    return 'Signup Instead';
                }else{
                    return  "Login Instead";
                }
            },
        },

        methods: {

            async submitForm() {

                //default to true
                this.formIsValid = true;

                if (this.email === '' || !this.email.includes('@') || this.password.length < 6)
                {
                    this.formIsValid = false;
                    return;
                }

                /*Error handling for the Authentication*/
                this.isLoading = true;
                try{
                    if( this.mode === 'login' ){
                        //Login with Firebase
                        await this.$store.dispatch("login", {
                            email: this.email,
                            password: this.password
                        });

                        const redirectURL = "/" + ( this.$route.query.redirect || "coaches");
                        this.$router.replace(redirectURL);
                    }
                    else
                    {
                        //Signup with Firebase
                        await this.$store.dispatch("signup", {
                            email: this.email,
                            password: this.password
                        });
                    }
                }catch(e){
                    this.error = e.message || 'Failed to Authenticate, try again';
                }
                this.isLoading = false;
                /*Error handling for the Authentication*/
            },

            switchAuthMode(){
                if( this.mode   === 'login' ){
                    this.mode = 'signup';
                }else {
                    this.mode = 'login';
                }
            },


            handleError(){
                this.error = null;
            }

        }
    }
</script>

<style scoped>
    .form-control {
        margin: 0.5rem 0;
    }

    label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
    }

    input[type='checkbox'] + label {
        font-weight: normal;
        display: inline;
        margin: 0 0 0 0.5rem;
    }

    input,
    textarea {
        display: block;
        width: 100%;
        border: 1px solid #ccc;
        font: inherit;
    }

    input:focus,
    textarea:focus {
        background-color: #f0e6fd;
        outline: none;
        border-color: #3d008d;
    }

    input[type='checkbox'] {
        display: inline;
        width: auto;
        border: none;
    }

    input[type='checkbox']:focus {
        outline: #3d008d solid 1px;
    }

    h3 {
        margin: 0.5rem 0;
        font-size: 1rem;
    }

    .invalid label {
        color: red;
    }

    span.invalid {
        color: red;
    }

    .invalid input,
    .invalid textarea {
        border: 1px solid red;
    }
</style>