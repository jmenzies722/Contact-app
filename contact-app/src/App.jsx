import { useState } from 'react';
import ContactList from './Components/ContactList.jsx';
import ContactForm from './Components/ContactForm.jsx';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // To track which contact is being edited

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

  const editContact = (id) => {
    const contact = contacts.find(contact => contact.id === id);
    setEditingContact(contact);
  };

  return (
    <div className="app">
      <h1>CALL ME MAYBE</h1>
      <ContactForm addContact={addContact} editingContact={editingContact} />
      <ContactList contacts={contacts} deleteContact={deleteContact} editContact={editContact} />
    </div>
  );
}

export default App;
