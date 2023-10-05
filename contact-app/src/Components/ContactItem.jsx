import { useState } from "react";
import PropTypes from "prop-types";

function ContactItem({ contact, deleteContact, updateContact }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(contact.name);
  const [editedEmail, setEditedEmail] = useState(contact.email);
  const [editedPhone, setEditedPhone] = useState(contact.phone);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateContact(contact.id, {
      name: editedName,
      phone: editedPhone,
      email: editedEmail,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(contact.name);
    setEditedEmail(contact.email);
    setEditedPhone(contact.phone);
  };

  return (
    <li className="contact-item">
      {isEditing ? (
        <>
          <div>
            Name:{" "}
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div>
            Email:{" "}
            <input
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>
          <div>
            Phone:{" "}
            <input
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <div>Name: {contact.name}</div>
          <div>Email: {contact.email}</div>
          <div>Phone: {contact.phone}</div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => deleteContact(contact.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

ContactItem.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired, // Changed to updateContact
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
