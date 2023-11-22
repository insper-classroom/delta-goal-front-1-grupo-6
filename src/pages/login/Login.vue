<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/shared/Button.vue';
import Input from '@/shared/Input.vue';

export default defineComponent({
    components: {
        Button,
        Input
    },
    methods: {
        async signInGoogle() {

        }

    },
    mounted() {
        
    }
    
})
</script>

<template>
    <div class="login-component">
        <aside class="form-container">
            <div class="title-container">
                <h1>Login</h1>
                <!-- texto obtido do site delta goal -->
                <p>Liberte o poder da Inteligência Artificial (IA) e da Visão Computacional (CV) para redefinir o seu jogo de futebol. Cada chute, cada passe, cada sprint são dados esperando para serem descobertos.</p>
            </div>
            <Input text="Email" style="margin-top: 20px;"/>
            <Input text="Senha" style="margin-top: 10px;"/>
            <Button text="Fazer login" color="70, 157, 221" style="width: 100%; margin-top: 20px;" icon="fa-duotone fa-arrow-right-to-arc" />
            <p class="create-account-text">Não tem cadastro? <a href="">Criar conta</a></p>
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
    .login-component {
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

    .create-account-text {
        margin: 0px auto;
        margin-top: 10px;
        color: rgba(0, 0, 0, 0.5);
    }

    .create-account-text a {
        color: rgba(0, 0, 0, 0.6);
        font-weight: 600;
    }
</style>