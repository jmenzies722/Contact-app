import PropTypes from 'prop-types';

function ContactItem({ contact, deleteContact, editContact }) {
  return (
    <li className="contact-item">
      <div>Name: {contact.name}</div>
      <div>Email: {contact.email}</div>
      <div>Phone: {contact.phone}</div>
      <button onClick={() => editContact(contact.id)}>Edit</button> {/* Added Edit button */}
      <button onClick={() => deleteContact(contact.id)}>Delete</button>
    </li>
  );
}

ContactItem.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  editContact: PropTypes.func.isRequired,  // Add this line for the new propType
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
