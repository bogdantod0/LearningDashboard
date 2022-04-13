import React from "react";
import styled from "styled-components";
import { useState } from "react";
import MessagePage from "./Messages/MessagePage";
import { connect } from "react-redux";

function LeftSide(props) {
  const [showMessages, setShowMessages] = useState(false);

  const handleShowMessages = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showMessages) {
      case true:
        setShowMessages(false);
        break;
      case false:
        setShowMessages(true);
        break;
      default:
        setShowMessages(false);
        break;
    }
  };

  return (
    <Container>
      {props.user && (
        <MessagePage
          showMessagePage={showMessages}
          handleClick={handleShowMessages}
        />
      )}

      <Menu>
        <button>
          <img src="/images/Iconly/Light-outline/Home-1.svg" alt="" />
          Overwiew
        </button>
        <button>
          <img src="/images/Iconly/Light-outline/Category.svg" alt="" />
          Course
        </button>
        <button>
          <img src="/images/Iconly/Light-outline/Folder.svg" alt="" />
          Resources
        </button>
        <button onClick={(e) => handleShowMessages(e)}>
          <img src="/images/Iconly/Light-outline/Chat.svg" alt="" />
          Messages
        </button>
        <button>
          <img src="/images/Iconly/Light-outline/Setting.svg" alt="" />
          Setting
        </button>

        <button className="upButtonSmallScreen">
          <img src="/images/Component 1.svg" alt="" />
          Upgrade
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
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(LeftSide);

const Container = styled.div`
  grid-area: leftside;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  @media (max-width: 760px) {
    border: none;
  }
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
    @media (min-width: 750px) {
      :last-child {
        display: none;
      }
    }
  }

  @media (max-width: 750px) {
    flex-direction: row;
    button {
      flex-direction: column;
      height: 60px;
      width: 60px;
      font-size: 12px;
    }
    img {
      padding-left: 20px;

      max-width: 44px;
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
