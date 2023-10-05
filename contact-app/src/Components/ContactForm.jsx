import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function ContactForm({ addContact, editingContact }) {
  const [name, setName] = useState(editingContact ? editingContact.name : "");
  const [email, setEmail] = useState(editingContact ? editingContact.email : "");
  const [phone, setPhone] = useState(editingContact ? editingContact.phone : "");

  // Update the form fields when editingContact changes
  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setEmail(editingContact.email);
      setPhone(editingContact.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
}, [editingContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    addContact({
      id: editingContact ? editingContact.id : Date.now(),
      name, 
      email, 
      phone
    });

    // Clear the form
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label><FontAwesomeIcon icon={faUser} /> Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label><FontAwesomeIcon icon={faEnvelope} /> Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label><FontAwesomeIcon icon={faPhone} /> Phone:</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/[^\d]/, ""))}
        pattern="\d*"
        required
      />
      <button type="submit">{editingContact ? "Save Changes" : "Add Contact"}</button>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  editingContact: PropTypes.object
};

export default ContactForm;
