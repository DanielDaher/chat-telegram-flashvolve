<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const inputChatId = ref('');
    const router = useRouter();

    const makeLogout = () => {
      localStorage.removeItem('tokenChatTelegramFlashVolve');
      return router.push('/');
    }

    return { makeLogout, inputChatId, router };
  },

  mounted() {
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
      </form>
    </div>
  </div>
</template>
