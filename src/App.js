import styled from "styled-components";
import React, { Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
function App() {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<LoginPage />}></Route>
      </Routes>

      <Routes>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Container>
  );
}

export default App;

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
