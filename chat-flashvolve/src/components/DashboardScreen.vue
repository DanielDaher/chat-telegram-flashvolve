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
      console.log(contacts.value[0])
    }

    const setCurrentChatId = (contact) => {
      currentChatId.value = contact.info.chat.id;
      const currentIndex = contacts.value.indexOf(contact);
      contacts.value[currentIndex] = { ...contact, newMessage: false } // ir no html e trocar o 'nova mensagem' por algum ícone
    } 

    const showFullName = (info) => {
      if (info.chat.type === 'private') {
        const firstName = info.chat.first_name;
        const lastName = info.chat.last_name;
        return `${firstName} ${lastName ? `${lastName}` : ''}`;
      }

      return `Grupo: ${ info.chat.title }`;
    }

    socket.on("telegramMessage", ({ chat, text }) => { //remover esse text e o console.log
      const oldContact = contacts.value.find((contact) => contact._id === chat.id);
      const newContact = { info: chat };

      if (oldContact) {
        const currentIndex = contacts.value.indexOf(oldContact);
        contacts.value[currentIndex] = { ...oldContact, newMessage: true }
      }
      
      if (!oldContact) {
        contacts.value.push(newContact);
        console.log('socket funcionou: ', { chat, text, newMessage: true });
      }
    });

    onBeforeUnmount(() => {
      console.log('before unmount')
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
  <div>
    <h2>Dashboard</h2>
      <a 
        href="http://t.me/chatTelegramFlashvolveBot"
        target="_blank">
        Clique aqui para chamar o telegram bot e receba novas mensagens!
      </a>
    <div v-if="contacts.length">
      <div v-for="contact in contacts" :key="contact._id">
        <div class="pointer" @click="setCurrentChatId(contact)">
          <header class="card-header">
            <p class="card-header-title" style="width: 180px">
              {{ showFullName(contact.info) }}
              {{ `${ contact.newMessage ? 'Nova Mensagem' : ''}` }}
            </p>
          </header>
        </div>
      </div>
    </div>
    <div class="dashboard-chats">
      <button @click="makeLogout">Sair</button>
    </div>
    <webchat :chatId="currentChatId" />
  </div>
</template>

<style scoped>
  .pointer {
    cursor: pointer
  }
</style>
