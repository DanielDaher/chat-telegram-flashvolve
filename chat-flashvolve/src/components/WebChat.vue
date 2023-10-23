<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import io from "socket.io-client";

export default {
  props: {
    // socket: Object
  },
  setup() {
    const socket = io(process.env.VUE_APP_API_URL);
    const messages = ref([]);
    const newMessage = ref("");

    const sendMessage = () => {
      if (newMessage.value) {
        socket.emit("chatMessage", newMessage.value);
        newMessage.value = "";
      }
    };

    socket.on("chatMessage", (message) => {
      messages.value.push(message);
    });

    onMounted(() => {
      // buscar mensagens
    });

    onBeforeUnmount(() => {
      console.log('before unmount')
      socket.disconnect();
    });

    return {
      messages,
      newMessage,
      sendMessage,
    };
  },
};
</script>

<template>
  <div>
    <div class="chat">
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
