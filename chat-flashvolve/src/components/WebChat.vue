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
      messages.value.push({ message });
      console.log('socket funcionou: ', message);
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
  <div>
    <p v-if="!chatId">Selecione uma conversa</p>
    <div class="chat" v-else>
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <strong><!-- {{ message.sender }}: --></strong> {{ message }}
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
    </div>
  </div>
</template>

<style scoped>
.chat {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 10px;
}

.chat-messages {
  height: 200px;
  overflow-y: scroll;
}

.message {
  margin-bottom: 5px;
}
</style>
