import {createRouter, createWebHistory} from 'vue-router'
import Login from './pages/login/Login.vue'
import RegisterVue from './pages/register/Register.vue'

const routes = [
    { path: "/login", component: Login},
    { path: "/register", component: RegisterVue},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router