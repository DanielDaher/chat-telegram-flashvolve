import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3001';

const validateFields = ({ userName, password }) => {
  if (userName.length < 2 || password.length < 4) return false;
  return true;
};

async function loginOrCreateUser({ userName, password, endpoint }) {
  const userError = 'Usuário ou senha incorretos';
  try {
    if (!validateFields({ userName, password })) return { loginResponse: { error: userError } };

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

export { loginOrCreateUser };
