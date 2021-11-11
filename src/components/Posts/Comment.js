import styled from "styled-components/macro";
const Comment = (props) => {
  return (
    <Container>
      <CommentContent>
        <UserContainer>{props.username}</UserContainer>
        {props.comment}
      </CommentContent>
      <TimeStamp>{props.timestamp}</TimeStamp>
    </Container>
  );
};

const Container = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
`;

const UserContainer = styled.span`
  font-weight: bold;
  margin-right: 0.3rem;
`;

const CommentContent = styled.div`
  flex: 2 1 0;
`;

const TimeStamp = styled.div`
  padding-left: 0.3rem;
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 0.5rem;
  color: #757575;
  text-transform: uppercase;
`;

export default Comment;
