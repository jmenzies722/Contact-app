import PropTypes from 'prop-types';
import ContactItem from './ContactItem.jsx';

function ContactList({ contacts, deleteContact }) {
  return (
    <ul className="contact-list">
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} deleteContact={deleteContact} />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
