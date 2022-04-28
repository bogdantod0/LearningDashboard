import React from "react";
import styled from "styled-components";
const PlanItemCard = (props) => {
  return (
    <Container>
      {props.data.image_url !== null ? (
        <PlanCardIcon src={`${props.data.image_url}`} />
      ) : (
        <PlanCardIcon src={`/images/cards/iconNotFound.png`} />
      )}
      <span>
        <h1>{props.data.name}</h1>
        <h2>{props.data.id}</h2>
      </span>
    </Container>
  );
};

export default PlanItemCard;
const Container = styled.div`
  background-color: #f7f7f7;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  width: 300px;
  border-radius: 15px;
  span {
    align-items: center;
    letter-spacing: 1px;
  }
  h1 {
    color: #303030;
    font-size: 14px;
  }
  h2 {
    font-size: 12px;
    color: #bdbdbd;
  }
`;
const PlanCardIcon = styled.img`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 45px;
  width: 45px;
  border-radius: 10px;
  margin: 10px;
`;
const Button = styled.div``;
