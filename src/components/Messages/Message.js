import React from "react";
import styled from "styled-components";

const Message = (props) => {
  return (
    <Container>
      <div className="header">
        <img src={`${props.data.photoURL}`} alt="" />
        <div>
          <h1>{props.data.displayName}</h1>
          <h2>Data</h2>
        </div>
      </div>
      <div className="message">
        <h1>{props.data.text}</h1>
      </div>
    </Container>
  );
};

export default Message;
const Container = styled.div`
  background-color: rgba(54, 159, 255, 0.9);
  color: white;
  padding: 5px;
  border-radius: 20px;
  margin: 10px;
  row-gap: 10px;
  min-width: 200px;
  width: fit-content;
  img {
    height: 40px;
    width: 40px;
    margin: 5px;
    border-radius: 50%;
  }
  .header {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.07);
    border-radius: 20px;
    margin-bottom: 5px;
    h1 {
      font-weight: 600;
    }
    h2 {
      font-size: 12px;
      font-weight: 400;
    }
  }
  .message {
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    width: fit-content;
  }
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
