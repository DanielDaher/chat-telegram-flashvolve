<script>
import Webchat from './WebChat.vue';
import { ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { getContacts } from '../services/api';
import io from 'socket.io-client';

export default {
  components: {
    Webchat
  },
  setup() {
    const inputChatId = ref('');
    const socket = io(process.env.VUE_APP_API_URL);
    const contacts = ref([]);
    const router = useRouter();

    const makeLogout = () => {
      localStorage.removeItem('tokenChatTelegramFlashVolve');
      return router.push('/');
    }

    const loadContacts = async () => {
      const telegramContacts = await getContacts();
      contacts.value = telegramContacts;
    }

    // socket.on("telegramMessage", (message) => {
    //   messages.value.push({ text: message });
    //   console.log('socket funcionou: ', message);
    // }); // isso aqui precisa ser um evento que recebe novos chats.

    onBeforeUnmount(() => {
      console.log('before unmount')
      socket.disconnect();
    });

    return { makeLogout, loadContacts, inputChatId, router };
  },

  mounted() {
    this.loadContacts();
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
    <webchat />
  </div>
</template>
