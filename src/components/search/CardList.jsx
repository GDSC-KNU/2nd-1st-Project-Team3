import { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Detail from "./Detail";

const CardList = ({ item }) => {
  const [clicked, setClicked] = useState();
  const handleCardClick = (id) => {
    setClicked(item.find((el) => el.id === id));
  };

  const CardListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 160px;
    gap: 10px;
    width: 100%;
  `;

  return (
    <>
      <CardListContainer>
        {item &&
          item.map((search) => (
            <Card
              title={search.title}
              id={search.id}
              date={search.date}
              onClick={() => handleCardClick(search.id)}
              clicked={clicked}
              setClicked={setClicked}
            />
          ))}

        {/* {clicked && <Detail clicked={clicked} setClicked={setClicked} />} */}
      </CardListContainer>
    </>
  );
};

export default CardList;
