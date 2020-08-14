import React from "react";
import Button from "antd/es/button";

const ContactBody = ({
  list,
  curentUser,
  setviewUser,
  editUser,
  setOtherUser,
  setVisible,
  setMessageData,
}) => {
  return list.map((contact, index) => {
    if (contact.key === curentUser.key) {
      return null;
    }
    return (
      <tr key={contact.key} className="user" onClick={() => setviewUser(index)}>
        <td>
          <div className="contact__name">
            <div
              className="contact__avatar"
              style={{ backgroundColor: contact.color }}
            >
              <h3 className="contact__avatar--letter">{contact.avatarName}</h3>
            </div>
            <div>
              <h2>{contact.fullName}</h2>
              <h5>{contact.email}</h5>
            </div>
          </div>
        </td>
        <td>{contact.companyName}</td>
        <td>{contact.phone}</td>
        <td>
          <Button type="primary" onClick={(e) => editUser(e, contact)}>
            Edit
          </Button>
        </td>
        <td>
          <Button
            type="primary"
            onClick={() => {
              setOtherUser(contact);
              setVisible(true);
              setMessageData(contact);
            }}
          >
            Message
          </Button>
        </td>
      </tr>
    );
  });
};

export default ContactBody;
