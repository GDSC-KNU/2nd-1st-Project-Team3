import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
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

function CountryList({ contents }) {
  if (!contents) return;
  return contents.map((content) => {
    return (
      <CardContainer>
        <img src={content.poster_path} alt="content poster" />
        <UserInfo>
          <Name>{content.title}</Name>
          <Info>개봉일자 : {content.date}</Info>
        </UserInfo>
      </CardContainer>
    );
  });
}

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin-top: 10px;
  background-color: #3a3a3a;
  border-radius: 5px;

  @media (max-width: 767px) {
    width: 80%;
  }
`;

const SearchBar = styled.input`
  border: none;
  margin: 20px 20px 20px 20px;
  border-radius: 5px;
  font-size: 17px;
  width: 80%;
  background-color: #3a3a3a;
  :focus {
    outline: none;
    color: white;
  }
`;

export default function SearchResult() {
  const [search, setSearch] = useState("");
  const [contents, setContents] = useState(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search");
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const getCountries = async () => {
      return await fetch(`/search?query=${search}`)
        .then((res) => {
          if (!res.ok) {
            return new Promise.reject("no country found");
          }
          return res.json();
        })
        .then((list) => {
          setContents(list);
        })
        .catch((err) => console.error(err));
    };
    if (search) getCountries();
  }, [search]);

  return (
    <div>
      {/* <input type="search" onChange={(e) => setSearch(e.target.value)} /> */}
      <MainWrapper>
        <SearchBarWrapper onClick={() => handleClick()}>
          <IoSearch size="24" color="#B0B0B0" style={{ padding: 10 }} />
          <SearchBar
            type="search"
            placeholder="search"
            onChange={handleInputChange}
          />
        </SearchBarWrapper>
      </MainWrapper>

      <ContentWrapper>
        {search ? <CountryList contents={contents} /> : ""}
      </ContentWrapper>
    </div>
  );
}
