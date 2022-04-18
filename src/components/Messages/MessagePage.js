import React, { Component, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  Timestamp,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { connect } from "react-redux";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessagePage = (props) => {
  const { uid, displayName, photoURL } = props.user;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "messages");
    //real time update

    onSnapshot(colRef, (snapshot) => {
      setMessages([]);
      snapshot.docs.forEach((doc) => {
        setMessages((prev) => [...prev, doc.data()]);
        console.log("onsnapshot", doc.data());
      });
    });
  }, []);

  async function setDbMessage() {
    await addDoc(collection(db, "messages"), {
      text: message,
      createdAt: Timestamp.now(),
      uid,
      displayName,
      photoURL,
    });
  }
  const handleTextChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const handleSendButton = (e) => {
    e.preventDefault();
    setDbMessage(message);
    setMessage("");
  };

  return (
    <>
      {props.showMessagePage && (
        <Container>
          <div className="TopButton">
            <button
              onClick={(e) => {
                props.handleClick(e);
              }}
            >
              {" "}
              x
            </button>
          </div>

          <ChatTitle>Messages</ChatTitle>
          <Channel>
            <TopChat>
              {messages &&
                messages
                  .sort((a, b) => a["createdAt"] - b["createdAt"])
                  .map((messages) => (
                    <Message key={messages.id} data={messages} />
                  ))}
            </TopChat>
            <BottomChat>
              <TextField
                sx={{
                  width: "100%",
                  color: "white",
                }}
                id="fullWidth"
                label="Message"
                variant="standard"
                autoFocus
                value={message}
                onChange={(e) => handleTextChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendButton(e);
                  }
                }}
              />
              <Button
                variant="text"
                endIcon={<SendIcon />}
                onClick={(e) => handleSendButton(e)}
                disabled={message === ""}
              >
                Send
              </Button>
            </BottomChat>
          </Channel>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
export default connect(mapStateToProps)(MessagePage);

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 1);
  z-index: 99999;
  animation: fadeIn 0.3s;
  width: 500px;
  max-height: 550px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: -1px 3px 21px 1px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: -1px 3px 21px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: -1px 3px 21px 1px rgba(0, 0, 0, 0.25);
  min-height: 400px;

  button {
    background-color: transparent;
    border: none;
    font-size: 20px;
    font-weight: 600;
  }
  .TopButton {
    padding: 5px;
  }
  @media (max-width: 760px) {
    width: 100%;
  }
`;

const ChatTitle = styled.div`
  padding-left: 10px;
  font-weight: 600;
  font-size: 24px;
`;
const Channel = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopChat = styled.div`
  height: 350px;
  width: 100%;
  overflow: auto;
  row-gap: 10px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: auto;
`;
const BottomChat = styled.div`
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  padding: 0 10px 0 10px;
`;
