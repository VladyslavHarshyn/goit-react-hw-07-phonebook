import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

const isDublicate = ({ name }, items) => {
  const normalizedItem = name.toLowerCase();
  const result = items.find(item => {
    return normalizedItem === item.name.toLowerCase();
  });
  return Boolean(result);
};

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getContact();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContact(data);
      console.log(data);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      console.log(contacts);
      if (isDublicate(data, contacts.items)) {
        alert(`${data.name} уже в списке контактов`);
        return false;
      }
    },
  }
);

export const removeContacts = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.removeContact(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
