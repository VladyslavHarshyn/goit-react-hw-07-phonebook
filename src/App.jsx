import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';

import { useSelector, useDispatch } from 'react-redux';
import { addContacts, removeContacts } from 'redux/items/items-action';
import { getContacts } from 'redux/items/items-selector';
import { getFilter } from 'redux/filter/filter-selector';
import { setFilter } from 'redux/filter/filter-action';

const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const addContact = ({ name, number }) => {
    const action = addContacts(name, number);
    const arrayOfName = contacts.map(contact => contact.name);
    if (arrayOfName.includes(name)) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(action);
  };

  const removeContact = id => {
    dispatch(removeContacts(id));
  };

  const getFiltredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return filterContacts;
  };

  // const filterContacts = getFiltredContacts();

  return (
    <div className="phonebook">
      <Section title={'Phonebook'}>
        <Form onSubmit={addContact} />
      </Section>
      <Section title={'Contacts'}>
        <Contacts
          removeContact={removeContact}
          getFilteredConatcts={getFiltredContacts()}
          handleFilter={event => dispatch(setFilter(event.currentTarget.value))}
        />
      </Section>
    </div>
  );
};

export default App;
