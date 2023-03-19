import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";
import { getSearchContent } from "../../apis/content";
import axios from "axios";
import CardList from "../../components/search/CardList";

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: grid;
  justify-items: center;
`;

// const CardList = ({ data }) => {
//   return (
//     <div className="cardList">
//       {data.map((card) => (
//         <Card key={card.id} {...card} />
//       ))}
//     </div>
//   );
// };

// function Card(props) {
//   const { id, title, date } = props;
//   return (
//     <div className="cardContainer">
//       {/* <img src="${poster_path}" alt="content image" /> */}
//       <h2>{id}</h2>
//       <h2>{title}</h2>
//       <p>{date}</p>
//     </div>
//   );
// }

const SearchResult = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [copy, setCopy] = useState([]);

  useEffect(() => {
    const fetch = async (keyword) => {
      const { data } = await axios.get(`/search?query=${"더글로리"}`);
      setSearchData(data);
      setCopy(data);
    };
    fetch();
  }, []);

  const handleClick = () => {
    // navigate("/ranking");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchData(
      copy.filter(
        (e) =>
          e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.id.includes(searchTerm)
      )
    );
  }, [searchTerm, copy]);

  return (
    <>
      <MainWrapper>
        <Search onChange={handleInputChange} />
      </MainWrapper>
      <ContentWrapper>
        <CardList item={searchData} />
      </ContentWrapper>
    </>
  );
};

export default SearchResult;
