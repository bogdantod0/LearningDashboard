import React from "react";
import styled from "styled-components";
function NotFound() {
  return (
    <Container>
      <h1>NOT FOUND 404</h1>
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 30px;
    font-weight: 700;
  }
`;
