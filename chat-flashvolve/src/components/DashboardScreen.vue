<script>
import { ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';

export default {
  setup() {
    const inputChatId = ref('');
    const socket = io(process.env.VUE_APP_API_URL);
     const messages = ref([]);
    // const socketRef = ref('');
    const router = useRouter();

    const makeLogout = () => {
      localStorage.removeItem('tokenChatTelegramFlashVolve');
      return router.push('/');
    }

    socket.on("telegramMessage", (message) => {
      messages.value.push({ text: message });
      console.log('socket funcionou: ', message);
    });

    onBeforeUnmount(() => {
      console.log('before unmount')
      socket.disconnect();
    });

    return { makeLogout, socket, inputChatId, router };
  },

  mounted() {
    // console.log(this.socketRef)
    // this.socketRef.value = io(process.env.VUE_APP_API_URL)
  }
};
</script>

<template>
  <div>
    <h2>Dashboard</h2>
    <div class="dashboard-chats">
      <button @click="makeLogout">Sair</button>
      <form>
        <input
          type="text"
          v-model="inputChatId"
          placeholder="Para iniciar uma conversa, insira aqui um chat.id"
        >
        <br>
        <a 
          href="http://t.me/chatTelegramFlashvolveBot"
          target="_blank">
          Ou então clique aqui para chamar o telegram bot
        </a>
      </form>
    </div>
  </div>
</template>
