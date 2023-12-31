import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'https://chat-telegram-flashvolve-api.onrender.com';
const authToken = localStorage.getItem('tokenChatTelegramFlashVolve');

const validateFields = ({ userName, password }) => {
  if (userName.length < 2 || password.length < 4) return false;
  return true;
};

async function loginOrCreateUser({ userName, password, endpoint }) {
  const userError = 'Usuário inválido ou senha curta';
  try {
    if (!validateFields({ userName, password })) return { response: { data: { error: userError } } };

    const APIResponse = await axios.post(`${axios.defaults.baseURL}/${endpoint}`, {
      userName,
      password
    });

    return APIResponse.data;
  } catch (error) {
    console.error('Erro na requisição: ', error);
    return error;
  }
}

async function getContacts() {
  const axiosConfig = {
    headers: {
      'Authorization': `${authToken}`
    }
  };
  const apiUrl = `${axios.defaults.baseURL}/messages/telegramContacts`;

  try {
    const APIResponse = await axios.get(apiUrl, axiosConfig);
    return APIResponse.data;
  } catch (error) {
    console.error('Erro na requisição: ', error);
    return { telegramContacts: [] }
  }
}

async function getLastThirtyMessages(chatId) {
  const axiosConfig = {
    params: { chatId },
    headers: {
      'Authorization': `${authToken}`
    }
  };
  const apiUrl = `${axios.defaults.baseURL}/messages`;

  try {
    const APIResponse = await axios.get(apiUrl, axiosConfig);
    return APIResponse.data;
  } catch (error) {
    console.error('Erro na requisição: ', error);
    return null;
  }
}

export { loginOrCreateUser, getContacts, getLastThirtyMessages };
