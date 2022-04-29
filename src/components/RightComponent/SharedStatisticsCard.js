import React from "react";
import styled from "styled-components";
const SharedStatisticsCard = (props) => {
  return (
    <Container>
      <h1>{props.data.symbol}</h1>
      <hr />
      <h2>{props.data.name}</h2>

      <div>
        <h2>Price:{props.data.price}$</h2>
      </div>
    </Container>
  );
};

export default SharedStatisticsCard;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgba(54, 159, 255, 0.3);
  padding: 30px;
  border-radius: 20px;
  min-height: 150px;
  width: 200px;
  h1 {
    position: relative;
    width: 100%;
    font-size: 18px;
  }
  h2 {
    font-size: 16px;
    color: rgba(54, 159, 255, 1);
    max-width: fit-content;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #006ed3;
    font-size: 30px;
  }
`;
