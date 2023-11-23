<script lang="ts">
import {defineComponent} from 'vue'
import Toast from './plugin/Toast.vue';

export default defineComponent({ 
    data() {
        return {}
    },
    components: { Toast },
    async mounted() {
        
        
    }
})
</script>

<template>
    <Toast />
    <div id="root">
        <router-view></router-view>>
    </div>
</template>

<style scoped>
    #root {
        height: 100%;
        width: 100%;
    }
   

</style>