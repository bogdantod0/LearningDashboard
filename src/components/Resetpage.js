import React, { useState } from "react";
import styled from "styled-components";
import { resetPassword } from "../Redux/actions";
import { connect } from "react-redux";

const ResetPage = (props) => {
  const [email, setEmail] = useState("");

  const reset = (e) => {
    setEmail("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showReset === true && (
        <Container>
          <Content>
            <ModalContainer>
              <button className="xButton" onClick={(e) => reset(e)}>
                x
              </button>
              <img src="/images/registerImg.jpg" alt="" />
              <h1 className="h3 mb-3 fw-normal">Please enter email</h1>

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

              <button
                class="w-100 btn btn-lg btn-primary mt-1"
                type="submit"
                onClick={() => props.sendReset(email)}
              >
                Reset
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

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  sendReset: (email) => dispatch(resetPassword(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);

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
