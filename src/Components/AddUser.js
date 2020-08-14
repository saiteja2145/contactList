import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import Button from "antd/es/button";
import { v4 } from "uuid";
import { useEffect } from "react";

const AddUser = ({ colors, randomNumber, addEditUser, addUser, editUser }) => {
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [error, setError] = useState({});

  const clearData = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setVisible(false);
  };

  useEffect(() => {
    if (addUser) {
      console.log(addUser);
      setFullName(addUser.fullName);
      setEmail(addUser.email);
      setPhone(addUser.phone);
      setCompany(addUser.companyName);
      setVisible(true);
    }
  }, [addUser]);

  const handleSubmit = () => {
    setError({});
    let err = false;
    if (fullName === "") {
      setError((prvErr) => ({
        ...prvErr,
        fullName: "UserName should not be empty",
      }));
      err = true;
    }
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      setError((prvErr) => ({ ...prvErr, email: "Invalid Email" }));
      err = true;
    }
    if (email === "") {
      setError((prvErr) => ({ ...prvErr, email: "Email should not be empty" }));
      err = true;
    }
    if (`${phone}`.length !== 10) {
      setError((prvErr) => ({ ...prvErr, phone: "Invalid Phone Number" }));
      err = true;
    }
    if (company === "") {
      setError((prvErr) => ({
        ...prvErr,
        company: "Company should not be empty",
      }));
      err = true;
    }

    if (err) {
      return;
    }

    const avatarName = fullName.split(" ");
    const data = {
      key: v4(),
      companyName: company,
      email: email,
      fullName: fullName,
      phone: phone,
      avatarName: `${avatarName[0][0]}${avatarName[1] ? avatarName[1][0] : ""}`,
      color: colors[randomNumber()],
    };
    if (!addUser) {
      addEditUser("add", data);
    } else {
      addEditUser("edit", { ...data, key: addUser.key }, addUser.key);
    }
    clearData();
  };

  return (
    <div>
      <button
        className="btn-primary"
        onClick={(e) => {
          editUser(e, null);
          setVisible(true);
        }}
      >
        + Add User
      </button>
      <Modal
        visible={visible}
        title="User Details"
        onCancel={() => {
          setVisible(false);
          clearData();
        }}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <div className="input__grid">
          <label htmlFor="fullName">Full Name</label>
          <div className="input__data">
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {error.fullName && <span className="error">{error.fullName}</span>}
          </div>

          <label htmlFor="email">Email</label>
          <div className="input__data">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <span className="error">{error.email}</span>}
          </div>

          <label htmlFor="phone">Phone Number</label>
          <div className="input__data">
            <input
              type="number"
              id="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error.phone && <span className="error">{error.phone}</span>}
          </div>
          <label htmlFor="company">Company Name</label>
          <div className="input__data">
            <input
              type="text"
              id="company"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            {error.company && <span className="error">{error.fullName}</span>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddUser;
