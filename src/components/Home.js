import React from "react";
import styled from "styled-components";
import LeftSide from "./LeftSide";
import MiddleSide from "./MiddleSide";
import RightSide from "./RightSide";
import Header from "./Header";
function Home() {
  return (
    <>
      <Header />
      <Layout>
        <LeftSide />
        <MiddleSide />
        <RightSide />
      </Layout>
    </>
  );
}

export default Home;
const Container = styled.div`
  margin: 0;
  max-width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside middle rightside";
  grid-template-columns: minmax(180px, 5fr) minmax(0, 15fr) minmax(0, 10fr);

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
