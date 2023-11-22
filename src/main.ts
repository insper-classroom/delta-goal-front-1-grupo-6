import { createApp } from 'vue'
import './styles/index.css'
import './styles/transitions.css'
import './styles/variables.css'
import App from './App.vue'

let app = createApp(App)

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import router from './router';
app.use(router)

app.mount('#app')

