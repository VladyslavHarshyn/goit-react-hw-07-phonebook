import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://631dfae1cc652771a48f2ef9.mockapi.io/contacts/contacts',
});

export const getContact = async () => {
  const { data } = await instance.get('/');
  return data;
};

export const addContact = async contacts => {
  const { data } = await instance.post('/', contacts);
  return data;
};

export const removeContact = async id => {
  const { data } = await instance.delete(`/${id}`);
  return data;
};
