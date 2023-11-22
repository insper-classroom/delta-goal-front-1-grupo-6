<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {};
    },
    props: {
        img: String,
        text: String,
        color: String,
        icon: String,
        loading: Boolean,
        mode: String
    },
    computed: {
        styleObject() {
            return {
                '--color': this.color,
            }
        }
    },
    methods: {
        clickEvent() {
            if (!this.loading) {
                this.$emit('button-component-click')
            } 
        }
    }
})
</script>

<template>
    <button :style = "styleObject" @click="clickEvent()" ref="button-element">
        <img class="fade" v-if = "img && !loading" :src="img" />
        <i class="fade" v-if = "icon && !loading" :class = "icon" :style="{marginRight: text ? '10px' : '0px'}"></i>
        <p class="fade" v-if="!loading">{{text}}</p>
    </button>
</template>

<style scoped>
    button {
        width: fit-content;
        padding: 0px 20px;
        height: 40px;
        min-height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        background: transparent;
        
        transition: all .5s;
        cursor: pointer;
        color: white;
        background: rgba(var(--color), 1);
        border: none;
        z-index: 10;
        position: relative;
        font-size: 12px;
    }
    button:hover {
        filter: brightness(1.2);
    }
    button img {
        height: 20px;
        margin-right: 10px;
        filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, .8));
    }
    
    button i {
        margin-right: 10px;
        font-size: 14px;
    }

    .loading-gif {
        filter: grayscale(1) brightness(100);
        position: absolute;
    }
    
   
</style>