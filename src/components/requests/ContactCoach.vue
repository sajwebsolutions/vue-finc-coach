<template>
    <base-card>
        <form @submit.prevent="submitForm">
            <div class="form-control" :class="{invalid: !email.isValid}">
                <label for="email">Email</label>
                <input type="text" id="email" v-model.trim="email.val" @blur="clearValidity('email')">
            </div>

            <div class="form-control" :class="{invalid: !msg.isValid}">
                <label for="msg">Message</label>
                <textarea name="" id="msg" rows="5" v-model.trim="msg.val" @blur="clearValidity('msg')"></textarea>
            </div>

            <div class="form-control">
                <span v-if="!isFormValid" class="invalid">Correct the Errors</span>
                <br>
                <base-button>Submit</base-button>
            </div>

        </form>
    </base-card>
</template>


<script>
    export default {
        data() {
            return {
                isFormValid: true,
                email: {
                    val: '',
                    isValid: true
                },

                msg: {
                    val: '',
                    isValid: true
                },
            }
        },

        methods: {

            clearValidity(input){
                this[input].isValid = true;
            },

            formValidation(){
                if( this.email.val === '' || !this.email.val.includes('@') )
                {
                    this.email.isValid = false;
                    this.isFormValid = false;
                }

                if( this.msg.val === '' )
                {
                    this.msg.isValid = false;
                    this.isFormValid = false;
                }


            },

            submitForm(){
                this.isFormValid = true;
                this.formValidation();
                if( !this.isFormValid )
                {
                    return false;
                }

                const formData  =   {
                    coachId: this.$route.params.id,
                    email: this.email.val,
                    msg: this.msg.val
                };

                this.$store.dispatch("requests/contactCoach", formData);
                this.$router.replace("/coaches");
            }
        },
    };
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