import React from "react";
import styled from "styled-components";
const PlanItemCard = (props) => {
  return (
    <Container>
      <PlanCardIcon />
      <span>
        <h1>PlanCard Title</h1>
        <h2>Plan Card Subtitle</h2>
      </span>
      <Button>...</Button>
    </Container>
  );
};

export default PlanItemCard;
const Container = styled.div`
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  min-width: 300px;
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
const PlanCardIcon = styled.div`
  background-image: URL("/images/cards/icon/Rectangle 25.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 45px;
  width: 45px;
  border-radius: 10px;
`;
const Button = styled.div``;
