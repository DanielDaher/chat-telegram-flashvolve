<script>
import Webchat from './WebChat.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { getContacts } from '../services/api';
import io from 'socket.io-client';

export default {
  components: {
    Webchat
  },
  setup() {
    const currentChatId = ref(null);
    const socket = io(process.env.VUE_APP_API_URL);
    const contacts = ref([]);
    const router = useRouter();

    const makeLogout = () => {
      localStorage.removeItem('tokenChatTelegramFlashVolve');
      return router.push('/');
    }

    const loadContacts = async () => {
      const { telegramContacts } = await getContacts();
      contacts.value = telegramContacts;
    }

    const setCurrentChatId = (contact) => {
      currentChatId.value = contact.info.chat.id;
      const currentIndex = contacts.value.indexOf(contact);
      contacts.value[currentIndex] = { ...contact, newMessage: false };
    } 

    const showFullName = (info) => {
      if (info.chat.type === 'private') {
        const firstName = info.chat.first_name;
        const lastName = info.chat.last_name;
        return `${firstName} ${lastName ? `${lastName}` : ''}`;
      }

      return `Grupo: ${ info.chat.title }`;
    }

    socket.on("telegramMessage", ({ chat }) => {
      const oldContact = contacts.value.find((contact) => contact._id === chat.id);
      const newContact = { info: chat };

      if (oldContact) {
        const currentIndex = contacts.value.indexOf(oldContact);
        contacts.value[currentIndex] = { ...oldContact, newMessage: true }
      }
      
      if (!oldContact) {
        contacts.value.push(newContact);
      }
    });

    onBeforeUnmount(() => {
      socket.disconnect();
    });

    onMounted(() => {
      loadContacts();
    });

    return { makeLogout, loadContacts, setCurrentChatId, showFullName, contacts, currentChatId, router };
  },
};

</script>

<template>
  <div class="dashboard-div">
    <header class="dashboard-header" >
      <button 
        class="button is-dark is-responsive is-hovered logout-button"
        @click="makeLogout"
      >
        Sair
      </button>
      <button
        title="Clique aqui para chamar o telegram bot e receber novas mensagens" 
        class="button is-link is-responsive is-hovered telegram-button"
      >
        <a
          href="http://t.me/chatTelegramFlashvolveBot"
          target="_blank"
        >
          Telegram Bot
        </a>
      </button>
      <div class="dashboard-chats box" v-if="contacts.length">
        <p class="title is-6">Conversas</p>
        <div v-for="contact in contacts" :key="contact._id">
          <div
            class="pointer"
            :title="contact.newMessage ? 'Nova mensagem' : 'Clique para iniciar conversa'"
            @click="setCurrentChatId(contact)"
          >
            <header class="card-header contact-chat">
              <p class="card-header-title" style="width: 180px">
                {{ showFullName(contact.info) }}
              </p>
              <span v-if="contact.newMessage" class="tag is-primary">!!!</span>
            </header>
          </div>
        </div>
      </div>
    </header>
    <webchat :chatId="currentChatId" />
  </div>
</template>

<style scoped>
  a {
    text-decoration: none;
    color: white;
  }
  .dashboard-div {
    display: flex;
    height: 100vh;
  }

  .dashboard-header {
    display: flex;
    flex-direction: column;
    margin: 35px;
    width: 500px;
  }

  .dashboard-chats {
    max-height: 70vh;
    overflow: auto;
    overflow-x: hidden;
  }

  .contact-chat {
    display: flex;
    justify-content: space-between;
  }

  .logout-button, .telegram-button {
    margin: 5px;
    width: 120px;
  }

  .pointer {
    cursor: pointer
  }
</style>
