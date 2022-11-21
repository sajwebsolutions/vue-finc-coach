<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" @change="getFilters" checked />
            <label for="frontend">Frontend</label>
        </span>

        <span class="filter-option">
            <input type="checkbox" id="backend" @change="getFilters" checked/>
            <label for="backend">Backend</label>
        </span>

        <span class="filter-option">
            <input type="checkbox" id="career" @change="getFilters" checked/>
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
    export default {
        data(){
            return {
                filters: {
                    frontend: true,
                    backend:true,
                    career: true
                },
            }
        },

        emits: ['update-filter'],

        methods:{
            getFilters(event){
                const inputId   =   event.target.id;
                const isActive  =   event.target.checked;
                //alert(inputId+"=>"+isActive);

                const updatedFilters    =   {
                    ...this.filters,
                    [inputId]: isActive
                };

                this.filters    =   updatedFilters;
                this.$emit('update-filter', updatedFilters);
            },
        }
    }
</script>


<style scoped>
    h2 {
        margin: 0.5rem 0;
    }

    .filter-option {
        margin-right: 1rem;
    }

    .filter-option label,
    .filter-option input {
        vertical-align: middle;
    }

    .filter-option label {
        margin-left: 0.25rem;
    }

    .filter-option.active label {
        font-weight: bold;
    }
</style>