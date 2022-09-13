import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './items/items-slice';
import { filterReducer } from './filter/filter-reducer';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

export default store;
