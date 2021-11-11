import React from "react";
import styled from "styled-components/macro";
// import logo from "../../assets/logo.png";
import logo from "../../assets/zgram.png";
// import { Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import UserAvatar from "../UserAvatar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logOut } = useAuth();

  const notImplemented = () => {
    toast.warn("This Feature is Not Implemented");
  };

  const signOutHandler = () => {
    logOut()
      .then((response) => {
        toast.success("Logged Out", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <Nav>
      <StyledLink to="/">
        <Logo>
          <Icon src={logo}></Icon>
        </Logo>
      </StyledLink>
      <Search>
        <SearchInput placeholder="Search"></SearchInput>
      </Search>
      <Menu>
        <MenuItem>
          <StyledLink to="/">
            <HomeIcon sx={{ width: 30, height: 30 }}></HomeIcon>
          </StyledLink>
        </MenuItem>
        {user ? (
          <>
            <MenuItem>
              <NavigationOutlinedIcon
                onClick={notImplemented}
                sx={{ width: 30, height: 30 }}
              ></NavigationOutlinedIcon>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/addpost">
                <AddBoxOutlinedIcon
                  sx={{ width: 30, height: 30 }}
                ></AddBoxOutlinedIcon>
              </StyledLink>
            </MenuItem>
            <MenuItem>
              <ExploreOutlinedIcon
                onClick={notImplemented}
                sx={{ width: 30, height: 30 }}
              ></ExploreOutlinedIcon>
            </MenuItem>
            <MenuItem onClick={signOutHandler}>
              <LogoutIcon sx={{ width: 30, height: 30 }}></LogoutIcon>
            </MenuItem>
          </>
        ) : null}
        {user ? (
          <MenuItem>
            <UserAvatar
              displayName={user?.displayName}
              photoURL={user?.photoURL}
            ></UserAvatar>
          </MenuItem>
        ) : (
          <MenuItem>
            <StyledLink to="/signin">
              {/* <Avatar sx={{ width: 30, height: 30 }}></Avatar> */}
              <SignIn>Sign In</SignIn>
            </StyledLink>
          </MenuItem>
        )}
      </Menu>
    </Nav>
  );
};

const StyledLink = styled(Link)`
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

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
  align-items: center;
  position: sticky;
  width: 100%;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
  padding: 0.5rem 1rem 0.5rem 0.5rem;
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

const MenuItem = styled.div`
  &:hover {
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  margin-left: 0.5rem;
`;

const SignIn = styled.span`
  &:hover {
  }
  color: white;
  text-align: center;
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.3rem;
`;

export default Header;
