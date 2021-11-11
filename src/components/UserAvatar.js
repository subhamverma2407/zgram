import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

const UserAvatar = (props) => {
  return (
    <div>
      <Wrapper>
        <AvatarIcon sx={{ width: 30, height: 30 }} src={props.photoURL}>
          {props.displayName[0]}
        </AvatarIcon>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  border: 2px solid #bf3a30;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  border-radius: 25px;
`;

const AvatarIcon = styled(Avatar)`
  &:hover {
    cursor: pointer;
  }
  /* border-radius: 25rem; */
`;
export default UserAvatar;
