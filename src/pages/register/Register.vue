<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/shared/Button.vue';
import Input from '@/shared/Input.vue';
import { StateInterface, useState } from './state/State';
import EmailStep from './components/EmailStep.vue';
import AuthCodeStep from './components/AuthCodeStep.vue';

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
        EmailStep,
        AuthCodeStep
    },
    methods: {

    },
    mounted() {
        
    }
    
})
</script>

<template>
    <div class="register-component">
        <aside class="form-container">
            <div class="steps-container">
                <p :class="{active: state.currentStep == 'email'}">1</p>
                <span></span>
                <p :class="{active: state.currentStep == 'authCode'}">2</p>
                <span></span>
                <p :class="{active: state.currentStep == 'infos'}">3</p>
            </div>
            <div class="title-container">
                <h1>Cadastro</h1>
                <p>Cadastra-se na nossa plataforma e desfrute de todo o poder da nossa inteligência artificial para melhorar a performance de seus jogadores e atletas.</p>
            </div>

            <EmailStep />
            <AuthCodeStep />

            <p class="login-account-text">Já tem uma conta? <a href="">Fazer login</a></p>
        </aside>
        <aside class="about-container">
            <img src="https://lirp.cdn-website.com/25aaefc0/dms3rep/multi/opt/logo-1920w.png" class="logo">
            <!-- texto obtido do site delta goal -->
            <p class="description-text">Our tool utilizes Artificial Intelligence to analyze the field and interpret the player's behavior, taking into account their movements and engagement with and without the ball. This provides the teams valuable insights into their tactical approach and enhances their gameplay</p>
        
            
            <div class="background-container">
                <video loop muted autoplay src="https://vid.cdn-website.com/25aaefc0/videos/xv15E24QR1Wi0Yiy8UBM_b-v.mp4"></video>
            </div>
        </aside>
    </div>
</template>

<style scoped>
    .register-component {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1.25fr;
    }

    .about-container {
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0);
        border-radius: 15px 0px 0px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
    }

    .about-container .logo {
        height: 90px;
        filter: drop-shadow(0px 0px 40px white);
        z-index: 1;

    }

    .about-container .description-text {
        width: 500px;
        text-align: center;
        margin-top: 40px;
        font-size: 14px;
        color: white;
        z-index: 1;
    }

    .about-container .background-container {
        height: 110%;
        width: 110%;
        position: absolute;
        mask-image: none;
        -webkit-mask-image: linear-gradient(0deg, rgba(255,255,255,0) 00%, rgba(60,90,240,1) 100%);
        background-size: cover;
        opacity: .5;
    }

    .background-container video {
        height: 100%;
    }

    /* ------------------------------ */
    
    .form-container {
        width: 100%;
        max-width: 450px;
        padding: 0px 20px;
        height: 100%;
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .title-container h1 {
        font-family: 'Urbanist';
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
    }

    .title-container p {
        font-family: 'Urbanist';
        font-style: normal;
        font-weight: 400;

        color: rgba(0, 0, 0, 0.4);
        margin-top: 10px;
    }

    .login-account-text {
        margin: 0px auto;
        margin-top: 10px;
        color: rgba(0, 0, 0, 0.5);
    }

    .login-account-text a {
        color: rgba(0, 0, 0, 0.6);
        font-weight: 600;
    }

    /* ------------------------------- */

    .steps-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .steps-container p {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        min-width: 30px;
        width: 30px;
        background-color: rgba(70, 157, 221, .1);
        border-radius: 100px;
        color: rgba(70, 157, 221, 1);
        font-weight: 600;
        border: dashed 1px rgba(70, 157, 221, 1);
    }

    .steps-container .active {
        border: solid 1px transparent;
        background-color: rgba(70, 157, 221, 1);
        color: white;
    }

    .steps-container span {
        width: 100%;
        height: 1px;
        border: dashed 1px rgba(0, 0, 0, 0.2);
        margin: 0px 20px;
    }
</style>