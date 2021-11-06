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
      <Logo>
        <Icon src={logo}></Icon>
      </Logo>
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

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Nav = styled.div`
  ${Search} {
    display: none;
  }
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
  padding: 0.5rem 2rem 0.5rem 2rem;
  @media (min-width: 600px) {
    ${Search} {
      display: block;
    }
    padding: 0.5rem 2rem 0.5rem 2rem;
    justify-content: space-around;
  }

  @media (min-width: 800px) {
    padding: 0.5rem 7rem 0.5rem 7rem;
  }
`;
const Logo = styled.div`
  &:hover {
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  display: inline-block;
  padding-top: 0.2rem;
  height: 2rem;
  object-fit: contain;
`;

const SearchInput = styled.input`
  &:hover,
  :focus {
    outline: none;
  }

  &:focus {
    padding: 0.8rem 6rem 0.8rem 1.5rem;
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
  &:hover {
    cursor: pointer;
  }
  width: 1.7rem;
  height: 1.7rem;
  padding: 0.2rem;
  margin-left: 1rem;
  object-fit: contain;
`;

export default Header;
