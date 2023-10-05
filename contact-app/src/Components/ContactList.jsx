import PropTypes from "prop-types";
import ContactItem from "./ContactItem.jsx";

function ContactList({ contacts, deleteContact, editContact }) {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
          updateContact={editContact} // Passing down the updateContact function
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteContact: PropTypes.func.isRequired,
  editContact: PropTypes.func.isRequired, // Add this line
};

export default ContactList;
