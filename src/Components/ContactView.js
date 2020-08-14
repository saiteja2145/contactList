import React from "react";
import ContactDetail from "./ContactDetail";

const ContactView = ({ contact, color, colors }) => {
  if (!contact) return null;
  return (
    <div>
      <div className="view__container">
        <div
          className="contact__avatar"
          style={{ backgroundColor: colors[color] }}
        >
          <h3 className="contact__avatar--letter">{contact.avatarName}</h3>
        </div>
        <h2 className="contact__fullName">{contact.fullName}</h2>
        <h5>{contact.email}</h5>
      </div>
      <div className="view__details">
        <ContactDetail name="Full Name" value={contact.fullName} />
        <ContactDetail name="Email" value={contact.email} />
        <ContactDetail name="phone" value={contact.phone} />
        <ContactDetail name="Company Name" value={contact.companyName} />
      </div>
    </div>
  );
};

export default ContactView;
