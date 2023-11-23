<script lang = "ts">
import { Emitter } from '@/emitter/Emitter';
import { defineComponent } from 'vue';

interface DataInterface {
    notifies: {
        [hash: string]: MessageInterface
    }
}

interface MessageInterface {
    message: String,
    duration?: number
}

export default defineComponent({
    data(): DataInterface {
        return {
            notifies: {
                
            }
        }
    },
    methods: {
        hash(length: number) {
            var result = [];
            var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            return result.join('');
        },
        addNotify(notify: MessageInterface) {
            let hash = this.hash(15)
            this.notifies[hash] = notify

            setTimeout(() => {
                delete this.notifies[hash]
            }, notify.duration ? notify.duration : 5000)
        }
    },
    mounted() {
        Emitter.on("add-notify", (notify) => {
            this.addNotify(notify as MessageInterface)
        })
    }
})
</script>

<template>
    <div class="notifies-toast-component">
        <TransitionGroup tag="ul" name="fade" class="container">
            <p 
                class="__toast" 
                v-for="(notify, index) in notifies" 
                :key="index"
                @click="delete notifies[index]"
                v-html='notify.message'
            >
            
            </p>
        </TransitionGroup>
    </div>
</template>

<style scoped>
    .notifies-toast-component {
        position: absolute;
        bottom: 10px;
        left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        z-index: 9999;
    }

    .__toast {
        padding: 10px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        border-radius: 5px;
        width: fit-content;
        margin-bottom: 10px;
        font-family: "Poppins";
        box-sizing: border-box;
        font-weight: 400;
        max-width: 400px;
        background: rgba(70, 157, 221, 1);
    }

    
    .fade-move,
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .fade-leave-active {
        width: max-content;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translate(-30px, 0px);
    }

    .fade-leave-active {
        position: absolute;
    }
</style>