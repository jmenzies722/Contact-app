import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

// Helper function to format phone number with dashes
const formatPhoneNumber = (inputNumber) => {
  const val = inputNumber.replace(/[^\d]/g, "");
  if (val.length <= 3) {
    return val;
  } else if (val.length <= 6) {
    return `${val.slice(0, 3)}-${val.slice(3)}`;
  } else {
    return `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6, 10)}`;
  }
};

function ContactForm({ addContact, editingContact }) {
  // Using the helper function to set the initial state
  const [name, setName] = useState(editingContact ? editingContact.name : "");
  const [email, setEmail] = useState(
    editingContact ? editingContact.email : ""
  );
  const [phone, setPhone] = useState(
    editingContact ? formatPhoneNumber(editingContact.phone) : ""
  );

  // Update the form fields when editingContact changes
  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setEmail(editingContact.email);
      setPhone(formatPhoneNumber(editingContact.phone));
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
      phone,
    });

    // Clear the form
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label>
        <FontAwesomeIcon icon={faUser} /> Name:
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>
        <FontAwesomeIcon icon={faEnvelope} /> Email:
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>
        <FontAwesomeIcon icon={faPhone} /> Phone:
      </label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => {
          const val = e.target.value.replace(/[^\d]/g, ""); // Remove all non-numeric characters
          if (val.length <= 3) {
            setPhone(val);
          } else if (val.length <= 6) {
            setPhone(`${val.slice(0, 3)}-${val.slice(3)}`);
          } else {
            setPhone(
              `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6, 10)}`
            );
          }
        }}
        pattern="\d{3}-\d{3}-\d{4}" // format is XXX-XXX-XXXX
        required
      />
      <button type="submit">
        {editingContact ? "Save Changes" : "Add Contact"}
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  editingContact: PropTypes.object,
};

export default ContactForm;
