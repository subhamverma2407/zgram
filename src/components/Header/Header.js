import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import home from "../../assets/home.PNG";
import messenger from "../../assets/messenger.PNG";
import add from "../../assets/add.PNG";
import explore from "../../assets/explore.PNG";
import like from "../../assets/like.PNG";

const Header = () => {
  return (
    <Nav>
      <Logo src={logo}></Logo>
      <Search>
        <SearchInput placeholder="Search"></SearchInput>
      </Search>
      <Menu>
        <MenuItem src={home}></MenuItem>
        <MenuItem src={messenger}></MenuItem>
        <MenuItem src={add}></MenuItem>
        <MenuItem src={explore}></MenuItem>
        <MenuItem src={like}></MenuItem>
      </Menu>
    </Nav>
  );
};

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
  padding: 0.5rem 10rem 0.5rem 10rem;
`;
const Logo = styled.img`
  width: 6rem;
  height: 2rem;
  object-fit: contain;
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  &:hover,
  :focus {
    outline: none;
  }
  padding: 0.8rem 6rem 0.8rem 6rem;
  width: 15rem;
  height: 1.5rem;
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 0.2rem;
  background-color: rgba(250, 250, 250, 1);
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  padding: 0.2rem;
  margin-left: 1rem;
  object-fit: contain;
`;

export default Header;
