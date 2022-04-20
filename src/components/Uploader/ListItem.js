import React from "react";
import styled from "styled-components";
import { useState } from "react";
////
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PhotoIcon from "@mui/icons-material/Photo";
////
const ListItem = (props) => {
  const mbSize = (props.data.size / 1024 / 1024).toFixed(2);
  const [typeIcon, setTypeIcon] = useState();

  return (
    <Container>
      <div className="left">
        {props.data.contentType === "application/pdf" ? (
          <PictureAsPdfIcon />
        ) : (
          <PhotoIcon />
        )}
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
  padding: 0 0 10px 0;
  h1 {
  }
  h2 {
    font-size: 14;
    font-weight: 400;
  }
  .left {
    height: 30px;
    padding-right: 5px;
  }
  .middle {
    width: 100%;
    overflow: hidden;
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      background-color: transparent;
      border-radius: 25px;
      border: 1px dashed gray;
    }
  }
`;
