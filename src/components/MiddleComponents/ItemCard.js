import React from "react";
import styled from "styled-components";
const ItemCard = (props) => {
  return (
    <>
      <Container>
        <Info>
          <h1>{props.data.name}</h1>
          <h2>{props.data.id}</h2>
        </Info>
        {props.data.image_url !== null ? (
          <Logo src={`${props.data.image_url}`} />
        ) : (
          <Logo src={`/images/cards/iconNotFound.png`} />
        )}

        <Background />
      </Container>
    </>
  );
};

export default ItemCard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
  border-radius: 20px;
  min-height: 100px;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
const Info = styled.div`
  position: relative;
  width: 100%;
  padding: 10px 30px 20px 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  h1 {
    font-size: 14px;
    font-weight: 700;
  }
  h2 {
    font-size: 10px;
    font-weight: 400;
  }
`;
const Logo = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;
  width: 110px;
  padding: 10px 10px 10px 10px;
  border-radius: 25px;
  /* background-color: transparent; */
`;
const Background = styled(Container)`
  background: url("/images/cards/background/Group 1.png");
  background-position: center;
  position: absolute;
  background-size: auto;
  height: 100%;
  width: 100%;
  z-index: -1;
`;
