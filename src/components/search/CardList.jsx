import { useState } from "react";
import styled from "styled-components";
import DetailPage from "../../pages/detail/Detailpage";

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 160px;
  gap: 10px;
  width: 100%;
`;

const CardList = ({ searchTerm }) => {
  const [clicked, setClicked] = useState();

  //   const handleCardClick = (id) => {
  //     setClicked(searchTerm.find((el) => el.id === id));
  //   };

  if (!searchTerm) return;
  return (
    searchTerm &&
    searchTerm.map((search) => {
      return (
        <CardListContainer>
          {/* {searchTerm &&
            searchTerm.map((search) => ( */}
          {/* <Card
            title={search.title}
            id={search.id}
            key={`${search.id}`}
            date={search.date}
          /> */}
          {/* ))} */}

          {/* {clicked && <DetailPage clicked={clicked} setClicked={setClicked} />} */}
        </CardListContainer>
      );
    })
  );
};

export default CardList;
