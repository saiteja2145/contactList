import React, { useState, useRef } from "react";
import "./ContactList.css";
import ContactView from "./ContactView";
import { v4 } from "uuid";
import AddUser from "./AddUser";
import Button from "antd/es/button";
import Select from "antd/es/select";
import Drawer from "antd/es/drawer";
import { useEffect } from "react";
import ContactBody from "./ContactBody";

const colors = [
  "#29bf12",
  "#e6c229",
  "#f17105",
  "#d11149",
  "#6610f2",
  "#1a8fe3",
];

const { Option } = Select;
const randomNumber = () => {
  return Math.ceil(Math.random() * colors.length);
};

const ContactList = () => {
  const [viewUser, setviewUser] = useState(0);
  const [addUser, setAddUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserMsg, setCurrentUserMsg] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const mainRef = useRef(null);
  const [list, setList] = useState([
    {
      key: v4(),
      companyName: "ABB Tech",
      email: "st2278@gmail.com",
      fullName: "John Doe",
      phone: 8940651334,
      avatarName: "JD",
      color: colors[randomNumber()],
    },
    {
      key: v4(),
      companyName: "XYZ Tech",
      email: "sj@gmail.com",
      fullName: "Stuart John",
      phone: 8940651334,
      avatarName: "SJ",
      color: colors[randomNumber()],
    },
  ]);

  const [curentUser, setCurrentUser] = useState(list[0]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const mms = currentUserMsg?.messages;

  useEffect(() => {
    if (mainRef && mainRef.current) {
      mainRef.current.scrollIntoView();
    }
  }, [mms]);

  const addEditUser = (type, data, key) => {
    if (type === "add") {
      setList([...list, data]);
    } else {
      const newList = list.map((li) => {
        if (li.key === key) {
          return data;
        }
        return li;
      });
      setList(newList);
    }
  };

  const editUser = (e, contact) => {
    e.stopPropagation();
    setAddUser(contact);
  };

  const sendMessage = () => {
    if (messages === "") {
      return;
    }
    let newMessages = messages;
    let index = newMessages.findIndex(
      (val) =>
        (val.key1 === curentUser.key || val.key2 === curentUser.key) &&
        (val.key1 === otherUser.key || val.key2 === otherUser.key)
    );

    if (index >= 0) {
      let newMessageData = { ...newMessages[index] };
      let messageQueue = [...newMessageData.messages];
      messageQueue.push({ key: curentUser.key, message: message, id: v4() });
      newMessageData.messages = messageQueue;
      newMessages[index] = newMessageData;
      setCurrentUserMsg(newMessageData);
      setMessages(newMessages);
    } else {
      let newMessageData = {
        key1: curentUser.key,
        key2: otherUser.key,
        messages: [{ key: curentUser.key, message: message, id: v4() }],
      };
      newMessages.push(newMessageData);
      setCurrentUserMsg(newMessageData);
      setMessages(newMessages);
    }

    setMessage("");
  };

  const setMessageData = (otherUsr) => {
    let newMessages = messages.filter(
      (val) =>
        (val.key1 === curentUser.key || val.key2 === curentUser.key) &&
        (val.key1 === otherUsr.key || val.key2 === otherUsr.key)
    );

    if (newMessages.length) {
      setCurrentUserMsg(newMessages[0]);
    } else {
      setCurrentUserMsg([]);
    }
  };

  return (
    <>
      <div className="add__user">
        <Select
          value={curentUser.key}
          className="select-after"
          onChange={(e) => {
            const user = list.find((val) => val.key === e);
            setCurrentUser(user);
          }}
        >
          {list.map((usVal) => (
            <Option key={usVal.key} value={usVal.key}>
              {usVal.fullName}
            </Option>
          ))}
        </Select>

        <AddUser
          randomNumber={randomNumber}
          colors={colors}
          addEditUser={addEditUser}
          addUser={addUser}
          editUser={editUser}
        />
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Company Name</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <ContactBody
              list={list}
              curentUser={curentUser}
              setviewUser={setviewUser}
              editUser={editUser}
              setOtherUser={setOtherUser}
              setVisible={setVisible}
              setMessageData={setMessageData}
            />
          </tbody>
        </table>

        <Drawer
          title={otherUser?.fullName}
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
          width={"90%"}
        >
          <div className="message__container">
            <div className="messages">
              {currentUserMsg?.messages?.map((msg, index) => {
                let alignMsg =
                  msg.key === curentUser.key ? "flex-end" : "flex-start";
                if (currentUserMsg?.messages.length === index + 1) {
                  return (
                    <div
                      key={msg.id}
                      className="message__bg"
                      style={{ alignSelf: alignMsg }}
                      ref={mainRef}
                    >
                      {msg.message}
                    </div>
                  );
                }
                return (
                  <div
                    key={msg.id}
                    className="message__bg"
                    style={{ alignSelf: alignMsg }}
                  >
                    {msg.message}
                  </div>
                );
              })}
            </div>
            <div className="send__massage--cotainer">
              <form
                className="message__input"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="message"
                />

                <Button type="primary" onClick={sendMessage}>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </Drawer>

        <div className="contact__view">
          <ContactView
            contact={list[viewUser] || null}
            color={randomNumber()}
            colors={colors}
          />
        </div>
      </div>
    </>
  );
};

export default ContactList;
