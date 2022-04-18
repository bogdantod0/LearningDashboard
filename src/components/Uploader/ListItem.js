import React from "react";
import styled from "styled-components";
import { useState } from "react";

const ListItem = (props) => {
  const mbSize = (props.data.size / 1024 / 1024).toFixed(2);
  const [typeIcon, setTypeIcon] = useState();

  return (
    <Container>
      <div className="left">
        <img src={typeIcon} alt="" />
      </div>
      <div className="middle">
        <h1>{props.data.name}</h1>
        <h2>{props.data.timeCreated}</h2>
      </div>
      <div className="right">
        <h2>{mbSize}/Mbs</h2>
        <button onClick={props.onClick}>Download</button>
      </div>
    </Container>
  );
};

export default ListItem;
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: whitesmoke; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  text-align: left;
  h1 {
    overflow: hidden;
  }
  h2 {
    font-size: 14;
    font-weight: 400;
  }
  .left {
    margin: 5px;
    height: 30px;
    width: 30px;
  }
  .middle {
    width: 100%;
    overflow: hidden;
  }
`;
