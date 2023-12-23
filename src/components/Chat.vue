<template>
    <div class="chat-header">CHATUS</div>

    <div class="chat-window">
        <div class="messages-window">
            <div class="message" v-for="message in messages">
                <span style="color: yellow">[{{message.author}}]</span>
                <span style="color: yellowgreen">[({{message.timestamp}})</span>
                <span>:</span>
                {{ message.text }}
            </div>
        </div>

        <div class="input-window">
            <label for="input-message-text">Message</label>
            <input id="input-message-text" v-model="messageToSend.text">

            <label for="input-message-text">Your name</label>
            <input id="input-message-author" v-model="messageToSend.author">
            <br>
            <button class="messages-button" id="input-send-button" @click.prevent="sendMessage">
                Send
            </button>
        </div>
    </div>


</template>

<script>
import axios from "axios";

export default {
    name: "Chat",
    data() {
        return {
            messages: [],
            messageToSend: {
                text: null,
                author: null
            }
        }
    },
    beforeMount() {
        this.loadMessages();
        this.initEventSource();
    },
    methods: {
        initEventSource() {
            const url = `${this.BACKEND_URL}/messages/subscribe`;
            this.eventSource = new EventSource(url);
            this.eventSource.onmessage = event => {
                this.loadMessages();
            };
            this.eventSource.onerror = () => {
                this.eventSource.close();
                this.initEventSource();
            }
        },
        loadMessages() {
            const limit = 15;
            const url = `${this.BACKEND_URL}/messages/get-last?limit=${limit}`;

            axios.get(url)
                .then(response => {
                    this.messages = response.data.reverse();
                });
        },
        sendMessage() {
            const url = `${this.BACKEND_URL}/messages/send`;
            axios.post(url, this.messageToSend);
        },
        formatDate(date) {
            return `${date.getDay()}`
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono';
    font-size: 16px;
    color: lime;
}

.chat-header {
    font-size: 40px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}

.chat-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 60vw;
    height: 70vh;
}

.messages-window {
    height: 80%;
}

.input-window {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#input-message-text {
    width: 100%;
}

#input-message-author {
    width: 50%;
}

.input-window input {
    background: #000011;
    border: lime 2px solid;
}

.messages-button {
    width: 50%;
    background: #000033;
    border: lime 2px solid;
}

.message {

}

</style>