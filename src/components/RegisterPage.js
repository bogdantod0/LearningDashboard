import { Dialpad } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { registerUser } from "../Redux/actions";
import { connect } from "react-redux";
const RegisterPage = (props) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const reset = (e) => {
    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setPassword("");
    props.handleClick(e);
  };
  return (
    <>
      {props.showRegister === true && (
        <Container>
          <Content>
            <ModalContainer>
              <button className="xButton" onClick={(e) => reset(e)}>
                x
              </button>
              <img src="/images/registerImg.jpg" alt="" />
              <h1 className="h3 mb-3 fw-normal">Please register</h1>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="First Name"
                  onChange={(e) => setFName(e.target.value)}
                />
                <label for="floatingInput">First name</label>
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Last Name"
                  onChange={(e) => setLName(e.target.value)}
                />
                <label for="floatingInput">Last Name</label>
              </div>
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="phone"
                  class="form-control"
                  id="floatingInput"
                  placeholder="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label for="floatingInput">Phone Number </label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="floatingInput">Password</label>
              </div>

              <button
                class="w-100 btn btn-lg btn-primary mt-1"
                type="submit"
                onClick={() => registerUser(email, password)}
              >
                Register
              </button>
              <button
                class="w-100 btn btn-lg btn-primary mt-1"
                type="submit"
                onClick={(e) => reset(e)}
              >
                Close
              </button>
            </ModalContainer>
          </Content>
        </Container>
      )}
    </>
  );
};
// email: 'user@example.com',
//     emailVerified: false,
//     phoneNumber: '+11234567890',
//     password: 'secretPassword',
//     displayName: 'John Doe',
//     photoURL: 'http://www.example.com/12345678/photo.png',

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  registerUser: (email, passwd) => dispatch(registerUser(email, passwd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 20px;
  margin: auto;
`;

const ModalContainer = styled.div`
  padding: 10px;
  box-sizing: border-box;
  display: block;
  margin-top: 0em;
  text-align: center;
  background-color: rgba(255, 255, 255, 1);
  div {
    box-sizing: border-box;
    display: block;
    padding: 2px;
  }
  img {
    max-width: 150px;
  }
  .xButton {
    display: flex;
    background: transparent;
    border: none;
  }
`;
