import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import logo from "../assets/zgram.png";

function SignIn() {
  const { user, signInWithGoogle } = useAuth();

  const signInHandler = async () => {
    await signInWithGoogle();
  };

  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, [user, nav]);

  return (
    <>
      <Container>
        <Login>
          <Logo>
            <img object-fit="contain" width="100%" alt="logo" src={logo}></img>
          </Logo>
          <LoginText>
            Please signin with your Google Account to use zgram.
          </LoginText>
          <Button onClick={signInHandler}>Sign In With Google</Button>
        </Login>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 15%;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Login = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  margin: 3rem;
  border: 1px solid rgba(219, 219, 219, 1);
`;

const LoginText = styled.div`
  text-align: center;
  padding: 1rem 1rem;
  font-size: 1rem;
  color: gray;
`;

const Button = styled.button`
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
  border: none;
  outline: none;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 2.5rem;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
`;

export default SignIn;
