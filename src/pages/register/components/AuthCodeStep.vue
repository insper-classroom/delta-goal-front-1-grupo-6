<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/shared/Button.vue';
import Input from '@/shared/Input.vue';
import { StateInterface, useState } from '../state/State';
import { Emitter } from '@/emitter/Emitter';
import { config } from '@/constants/config';

interface DataInterface {
    state: StateInterface
    codeBlocks: (null | string)[]
}

export default defineComponent({
    data(): DataInterface {
        return {
            state: useState(),
            codeBlocks: [null, null, null, null, null, null]
        }
    },
    components: {
        Button,
        Input,
    },
    watch: {
        codeBlocks: {
            handler() {
                for (let i in this.codeBlocks) {
                    let nums = "1234567890".split('')
                    if (nums.includes(String(this.codeBlocks[i]))) {
                        continue
                    }

                    if ((Number(this.codeBlocks[i]) || 0) > 9 || String(this.codeBlocks[i]).length > 1) {
                        this.codeBlocks[i] = this.codeBlocks[i]?.at(-1) || null
                    }

                    if (!nums.includes(String(this.codeBlocks[i]))) {
                        this.codeBlocks[i] = null
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        inputEvent(event: Event, index: number) {
            console.log(event)
            let nextElement = (event.currentTarget as HTMLInputElement).nextSibling as HTMLInputElement
            let previousElement = (event.currentTarget as HTMLInputElement).previousSibling as HTMLInputElement
            
            if (Number(this.codeBlocks[index]) && nextElement.focus) { 
                nextElement.focus()
            } 
        },
        async nextStep() {
            let code = this.codeBlocks.join("")

            let responseData = await (await fetch(config.serverUrl + "/email/validate", {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: this.state.infos.email, token: code})
            })).json()

            Emitter.emit("add-notify", {message: responseData.message})
            
            if (responseData.status != "success") return

            this.state.emailToken = responseData["jwt_token"]
            this.state.currentStep = "infos"
        }
    },
    mounted() {
        
    }
    
})
</script>

<template>
    <div class="auth-code-component fade" v-if="state.currentStep == 'authCode'">
        <div class="inputs-container">
            <input type="text" v-for="i in 6" :key="i" v-model="codeBlocks[i]" placeholder="0" @keyup="inputEvent($event, i)">
        </div>

        <Button text="Prosseguir" color="70, 157, 221" style="width: 100%; margin-top: 20px;" icon="fa-duotone fa-arrow-right-to-arc" @click="nextStep()"/>
    </div>
</template>

<style scoped>
    .auth-code-component {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        
    }

    .inputs-container {
        display: flex;
        gap: 10px;
    }

    .inputs-container input {
        width: 60px;
        height: 60px;
        border: solid 1px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        text-align: center;
        font-size: 20px;
        outline: none;
    }
    
    .inputs-container input::placeholder {
        color: rgba(0, 0, 0, 0.2);
        font-size: 20px;
        font-weight: 200;
    }

  
</style>