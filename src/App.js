import LeftSide from "./components/LeftSide";
import MiddleSide from "./components/MiddleSide";
import RightSide from "./components/RightSide";
import styled from "styled-components";
import React, { Component } from "react";

function App() {
  return (
    <Container>
      <Layout>
        <LeftSide />
        <MiddleSide />
        <RightSide />
      </Layout>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 0;
  max-width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside middle rightside";
  grid-template-columns: minmax(180px, 5fr) minmax(0, 15fr) minmax(0, 10fr);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
