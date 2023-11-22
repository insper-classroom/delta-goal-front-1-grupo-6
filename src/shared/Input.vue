<script lang = "ts">
import { defineComponent } from 'vue';
import Cleave from 'cleave.js'


export default defineComponent({
    components: {},
    data() {
        return {
        };
    },
    props: {
        modelValue: String,
        text: String,
        icon: String,
        type: String,
        placeholder: String
        
    },
    methods: {
        updateInput(event: Event) {
            let value = (event.currentTarget as HTMLInputElement).value
            this.$emit('update:modelValue', value)
        }
    },
    mounted() {

    }
})
</script>

<template>
    <label class="input-component">
        <p class="text">{{ text }}</p>
        <input 
            ref = "input"
            :type="type ? type : 'text'" 
            :value="modelValue"
            @input="updateInput($event)" 
            :placeholder="placeholder ? placeholder : 'Digite aqui...'"
        />
    </label>
</template>

<style scoped>
    .input-component {
        width: 100%;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        border-radius: 10px;
        
    }

    .input-component .text {
        color: rgba(0, 0, 0, 0.4);
        transition: all .3s;
        white-space: nowrap;
    }


    .input-component input {
        height: 40px;
        width: 100%;
        color: rgb(0, 0, 0);
        font-size: 12px;
        outline: none;
        border: none;
        background-color: transparent;
        transition: all .5s;
        padding-left: 16px;
        border: solid 1px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }

    .input-component input:focus {
        border: solid 1px rgba(0, 0, 0, 0.2);
    }

    .input-component input::placeholder {
        color: rgba(0, 0, 0, 0.2);
    }

    
   
    .input-component:hover .pop-up {
        display: block;
    }
</style>