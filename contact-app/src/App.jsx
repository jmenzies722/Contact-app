import  { useState } from 'react';

import ContactList from './Components/ContactList.jsx';
import ContactForm from './Components/ContactForm.jsx';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  
  return (
    <div className="app">
      <h1>CALL ME</h1>
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
