import styled from "styled-components";
import React, { Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getUserAuth } from "./Redux/actions";
import NotFound from "./components/NotFound";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
        </Routes>

        <Routes>
          <Route exact path="home" element={<Home />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

const Container = styled.div`
  margin: 0;
  max-width: 100%;
  max-height: 100%;
`;

// const Layout = styled.div`
//   display: grid;
//   grid-template-areas: "leftside middle rightside";
//   grid-template-columns: minmax(180px, 5fr) minmax(0, 15fr) minmax(0, 10fr);

//   @media (max-width: 760px) {
//     display: flex;
//     flex-direction: column;
//     padding: 0 5px;
//   }
// `;
