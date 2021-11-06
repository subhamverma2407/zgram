import styled from "styled-components";

import Header from "./components/Header/Header";

const Main = styled.div`
  width: 70%;
  margin: auto;
  background: green;
  top: 5rem;
  position: relative;
  z-index: -1;
`;

function App() {
  return (
    <>
      <Header></Header>
      <Main>
        <Posts></Posts>
      </Main>
    </>
  );
}

export default App;
