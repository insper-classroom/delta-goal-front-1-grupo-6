<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/shared/Button.vue';
import Input from '@/shared/Input.vue';
import { StateInterface, useState } from '../state/State';
import { Emitter } from '@/emitter/Emitter';
import { config } from '@/constants/config';

interface DataInterface {
    state: StateInterface,
    repeatPwd: string
}

export default defineComponent({
    data(): DataInterface {
        return {
            state: useState(),
            repeatPwd: ""
        }
    },
    components: {
        Button,
        Input,
    },
    methods: {
        async registerUser() {
            for (let i in this.state.infos) {
                if (!this.state.infos[i]) {
                    return Emitter.emit("add-notify", {message: "Preencha todas as informações para poder finalizar."})
                }
            }

            if (this.repeatPwd != this.state.infos.password) {
                return Emitter.emit("add-notify", {message: "Senhas não coincidem."})
            }

            let responseData = await (await fetch(config.serverUrl + "/register/user", {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email_token: this.state.emailToken, 
                    club_name: this.state.infos.clubName,
                    password: this.state.infos.password
                })
            })).json()

            Emitter.emit("add-notify", {message: responseData.message}) 

            if (responseData.status != "success") {
                return 
            }
            
            this.$router.push("/login")
        }
    },
    mounted() {
        
    }
    
})
</script>

<template>
    <div class="email-step-component fade" v-if="state.currentStep == 'infos'">
        <Input text="Nome do clube" v-model="state.infos.clubName"/>
        <Input text="Senha" v-model="state.infos.password"/>
        <Input text="Repetir senha" v-model="repeatPwd"/>

        <Button text="Finalizar cadastro" color="70, 157, 221" style="width: 100%; margin-top: 10px;" icon="fa-duotone fa-arrow-right-to-arc" @click="registerUser()"/>
    </div>
</template>

<style scoped>
    .email-step-component {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        gap: 10px;
        
    }

  
</style>