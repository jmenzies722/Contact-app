import { useState, useEffect } from 'react';
import ContactList from './Components/ContactList.jsx';
import ContactForm from './Components/ContactForm.jsx';
import './App.css';

function App() {
  const initialContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const [contacts, setContacts] = useState(initialContacts);
  const [editingContact, setEditingContact] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    if(editingContact) {
      updateContact(editingContact.id, contact);
      setEditingContact(null);
    } else {
      setContacts([...contacts, { ...contact, id: Date.now() }]);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const updateContact = (id, updatedContact) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? {...updatedContact, id} : contact
    ));
  };
  

  return (
    <div className="app">
      <h1>CALL ME MAYBE</h1>
      <ContactForm addContact={addContact} editingContact={editingContact} />
      <button onClick={() => setViewAll(!viewAll)}>
        {viewAll ? "Hide Contacts" : "View All"}
      </button>
      {viewAll && <ContactList contacts={contacts} deleteContact={deleteContact} editContact={updateContact} />
}
    </div>
  );
}

export default App;
