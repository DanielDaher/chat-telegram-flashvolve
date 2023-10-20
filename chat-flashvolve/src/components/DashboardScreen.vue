<script>
// import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    // const newAccount = ref(false);
    // const errorMessage = ref('');
    // const username = ref('');
    // const password = ref('');
    const router = useRouter();

    const makeLogout = () => {
      localStorage.removeItem('tokenChatTelegramFlashVolve');
      return router.push('/');
    }

    return { makeLogout, router };
  },

  mounted() {
  }
};
</script>

<template>
  <div>
    <h2>Dashboard</h2>
    <button @click="makeLogout">Sair</button>
    <div class="dashboard-chats">
      <form>
        <input type="text" placeholder="Para iniciar uma conversa, insira aqui um chat.id">
      </form>
    </div>
  </div>
</template>
