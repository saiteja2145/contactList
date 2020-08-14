import React from "react";

const ContactDetail = ({ name, value }) => {
  return (
    <>
      <h3 className="view__detail--head">{name}</h3>
      <h3 className="view__detail--body">{value}</h3>
    </>
  );
};

export default ContactDetail;
