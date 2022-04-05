import React from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import LongMenu from "./DotMenu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { connect } from "react-redux";
import { signOutGoogleApi } from "../Redux/actions";
import { signOut } from "firebase/auth";
function Header(props) {
  return (
    <HeaderContainer>
      <Title>
        <img src="/images/title-logo.svg" alt="" />
        <span>
          SE<span>•</span>T
        </span>
      </Title>

      <Greeting>
        {props.user && props.user.displayName ? (
          <span>
            Hello <b>{props.user.displayName}</b>, welcome back!
          </span>
        ) : (
          <span>
            Hello <b>USER</b>, welcome back!
          </span>
        )}
      </Greeting>

      <UserHeader>
        <IconButton aria-label="Notification" onClick={() => props.signOut()}>
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <User>
          <UserMenuAvatar />
          <div>
            <h1>Username</h1>
            <h6>User Plan</h6>
          </div>
          <UserMenuButton>
            <LongMenu />
          </UserMenuButton>
        </User>
      </UserHeader>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutGoogleApi()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
const HeaderContainer = styled.div`
  /* background-color: rgba(0, 0, 0, 0.1); */
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 760px) {
    align-items: center;
    justify-content: space-between;
  }
`;
const Title = styled.div`
  padding-left: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #006ed3;
  line-height: 2;
  letter-spacing: 2px;
  padding-top: 10px;
  img {
    padding-right: 15px;
  }
  @media (max-width: 760px) {
    padding-left: 30px;
  }
`;
const Greeting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: rgba(54, 159, 255, 1);
  line-height: 2;
  letter-spacing: 1.5px;

  @media (max-width: 760px) {
    display: none;
  }
`;
const User = styled.div`
  background-color: rgba(54, 159, 255, 0.3);
  border-radius: 15px;
  display: flex;
  align-items: center;
  line-height: 3px;
  width: 100%;
  h1 {
    font-size: 14px;
  }
  h6 {
    font-size: 10px;
  }
  margin: 10px;
`;
const UserMenuAvatar = styled.div`
  background: url("/images/account_circle.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 30px;
  width: 30px;
  margin: 5px;
`;
const UserMenuButton = styled.div``;
const UserHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
`;
