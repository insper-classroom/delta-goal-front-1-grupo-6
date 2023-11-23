<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/shared/Button.vue';
import Input from '@/shared/Input.vue';
import { StateInterface, useState } from '../state/State';
import { Emitter } from '@/emitter/Emitter';

interface DataInterface {
    state: StateInterface
}

export default defineComponent({
    data(): DataInterface {
        return {
            state: useState()
        }
    },
    components: {
        Button,
        Input,
    },
    methods: {
        nextStep() {
            if (!this.state.infos.email) {
                return Emitter.emit("add-notify", {message: "Preencha seu email para prosseguir"})
            }

            this.state.currentStep = "authCode"
        }
    },
    mounted() {
        
    }
    
})
</script>

<template>
    <div class="email-step-component fade" v-if="state.currentStep == 'infos'">
        <Input text="Email" v-model="state.infos.email"/>

        <Button text="Prosseguir" color="70, 157, 221" style="width: 100%; margin-top: 20px;" icon="fa-duotone fa-arrow-right-to-arc" @click="nextStep()"/>
    </div>
</template>

<style scoped>
    .email-step-component {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        
    }

  
</style>