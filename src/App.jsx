import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getContacts,
  addContacts,
  removeContacts,
} from 'redux/items/items-operations';
import { fetchContacts } from 'redux/items/items-selector';
import { getFilter } from 'redux/filter/filter-selector';
import { setFilter } from 'redux/filter/filter-action';

const App = () => {
  const contacts = useSelector(fetchContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const onAddContact = data => {
    const action = addContacts(data);
    dispatch(action);
  };

  const onRemoveContact = id => {
    dispatch(removeContacts(id));
  };

  const getFiltredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return filterContacts;
  };

  return (
    <div className="phonebook">
      <Section title={'Phonebook'}>
        <Form onSubmit={onAddContact} />
      </Section>
      <Section title={'Contacts'}>
        <Contacts
          removeContact={onRemoveContact}
          getFilteredConatcts={getFiltredContacts()}
          handleFilter={event => dispatch(setFilter(event.currentTarget.value))}
        />
      </Section>
    </div>
  );
};

export default App;
