<script>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { getLastThirtyMessages } from '../services/api';
import io from "socket.io-client";

export default {
  props: {
    chatId: Number,
  },
  setup(props) {
    const socket = io(process.env.VUE_APP_API_URL);
    const messages = ref([]);
    const newMessage = ref("");

    const loadMessages = async () => {
      if (props.chatId) {
        const oldMessages = await getLastThirtyMessages(props.chatId);  
        messages.value = oldMessages.messages;
      }
    };

    const sendMessage = () => {
      if (newMessage.value) {
        const token = localStorage.getItem('tokenChatTelegramFlashVolve');
        const socketData = { 
          message: newMessage.value,
          token,
          chatId: props.chatId
        }
        socket.emit("chatMessage", socketData);
        newMessage.value = "";
      }
    };

    socket.on("telegramMessage", (message) => {
      if (message.chat.id !== props.chatId) return;
      messages.value.push(message);
    });

    socket.on("chatMessage", (message) => {
      if (message.chat.id !== props.chatId) return;
      messages.value.push(message);
    });

    watch(() => props.chatId, (newValue) => {
      loadMessages(newValue);
    });

    onMounted(() => {
      loadMessages(props.chatId);
    });

    onBeforeUnmount(() => {
      socket.disconnect();
    });

    return {
      messages,
      newMessage,
      sendMessage,
      loadMessages,
    };
  },
};
</script>

<template>
  <main class="box is-responsive">
    <p v-if="!chatId" class="title is-6">Selecione uma conversa</p>
    <div v-else class="chat">
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index" 
          :class="`message ${ message.source === 'telegram' ? 'telegram-message' : 'webchat-message' }`"
        >
            {{ message.text }}
        </div>
      </div>
    </div>
    <input
      v-if="chatId" 
      v-model="newMessage" 
      @keyup.enter="sendMessage"
      class="input is-hovered"
      type="text"
      placeholder="Digite sua mensagem e aperte enter..." 
    />
    <button @click="sendMessage" class="button is-info">Enviar</button>
  </main>
</template>

<style scoped>
main {
  margin: 35px;
  width: 60vw;
}
.chat {
  max-height: 85vh;
}

.chat-messages {
  height: 75vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  width: 300px;
  min-height: 50px;
  overflow-x: auto;
  border-radius: 10px;
}

.telegram-message {
  align-self: flex-start;
  background-color: rgb(118,106,200);
  color: white;
}

.webchat-message {
  align-self: flex-end;
  margin-right: 5px;
}

button {
  margin: 10px;
}

</style>
