import styled from "styled-components/macro";
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import "react-toastify/dist/ReactToastify.css";
import AddPost from "./pages/AddPost";

const Application = styled.div``;

const Main = styled.div`
  max-width: 40rem;
  margin: auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Application>
      <Header></Header>
      <Main>
        <Routes>
          <Route exact path="/" element={<Posts></Posts>}></Route>
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/addpost" element={<AddPost></AddPost>}></Route>
        </Routes>
      </Main>
    </Application>
  );
}

export default App;
