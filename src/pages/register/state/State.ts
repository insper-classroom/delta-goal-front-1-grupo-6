import { defineStore } from 'pinia'

let defaultState: StateInterface = {
    infos: {
        clubName: "",
        password: "",
        email: ""
    },
    emailToken: "",
    currentStep: "email"
}

export const useState = defineStore('register-state', {
    state: () => {
        return <StateInterface>defaultState 
    },

})

export interface StateInterface {
    infos: {
        clubName: string,
        password: string,
        email: string
    },
    emailToken: string
    currentStep: "email" | "authCode" | "infos"
}