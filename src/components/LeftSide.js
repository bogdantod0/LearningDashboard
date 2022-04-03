import React from "react";
import styled from "styled-components";

function LeftSide() {
  return (
    <Container>
      <Title>
        <img src="/images/title-logo.svg" alt="" />
        <span>
          SE<span>•</span>T
        </span>
      </Title>
      <Menu>
        <button>
          <img src="/images/Iconly/Light-outline/Home-1.svg" alt="" />
          <a> Overwiew </a>
        </button>
        <button>
          <img src="/images/Iconly/Light-outline/Category.svg" alt="" />
          <a> Course </a>
        </button>
        <button>
          <img src="/images/Iconly/Light-outline/Folder.svg" alt="" />
          <a> Resources </a>
        </button>
        <button>
          <img src="/images/Iconly/Light-outline/Chat.svg" alt="" />
          <a> Messages </a>
        </button>
        <button>
          <img src="/images/Iconly/Light-outline/Setting.svg" alt="" />
          <a> Setting </a>
        </button>

        <button className="upButtonSmallScreen">
          <img src="/images/Component 1.svg" alt="" />
          <a> Upgrade </a>
        </button>
      </Menu>

      <Figurine>
        <img src="/images/Group.png" alt="" />
      </Figurine>

      <Card>
        <span>Upgrade your plan</span>
        <div>
          <span>
            Go to<span>PRO</span>
          </span>
          <button>
            <img src="/images/Component 1.svg" alt="" />
          </button>
        </div>
      </Card>
    </Container>
  );
}

export default LeftSide;

const Container = styled.div`
  grid-area: leftside;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const Title = styled.div`
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #006ed3;
  line-height: 2;
  letter-spacing: 2px;
  padding-top: 20px;
  img {
    padding-right: 15px;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding-top: 20px;
  button {
    background-color: transparent;
    outline: none;
    color: rgba(0, 0, 0, 0.2);
    font-size: 14px;
    line-height: 1.5;
    border: none;
    display: flex;
    width: 100%;
    justify-content: left;
    align-items: center;
    font-weight: 400;
    padding: 5px;

    img {
      margin-right: 20px;
    }
    :hover {
      color: rgba(0, 0, 0, 0.5);
    }
    @media (min-width: 760px) {
      :last-child {
        display: none;
      }
    }
  }

  @media (max-width: 750px) {
    flex-direction: row;

    button {
      flex-direction: column;
    }
    img {
      padding-left: 20px;
    }
  }
`;

const Figurine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  padding-top: 20px;
  @media (max-width: 760px) {
    display: none;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 18px;
  padding: 10px 15px 10px 15px;
  margin-bottom: 40px;

  box-sizing: border-box;
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.2);
  span {
    text-align: center;
    size: 16px;
    font-weight: 600;
  }

  div {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: 400;
      color: rgba(54, 159, 255, 1);
      padding: 0 0 0 10px;
    }

    span {
      font-weight: 600;
    }

    button {
      background-color: transparent;
      outline: none;
      border: none;
    }
  }
  :hover {
    div {
      span {
        font-weight: 900;
      }
    }
  }
  @media (max-width: 760px) {
    display: none;
  }
`;
