import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  img {
    width: 60px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

const Name = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const Info = styled.span`
  font-size: 14px;
`;

const Card = ({ id, title, date, poster_path, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <img src={poster_path} alt="content poster" />
      <UserInfo>
        <Name>{title}</Name>
        <Info>▶︎ ID : {id}</Info>
        <Info>▶︎ date : {date}</Info>
      </UserInfo>
    </CardContainer>
  );
};

export default Card;
