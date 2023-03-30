import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getSearchContent } from "../../apis/content";
import CardList from "../../components/search/CardList";
import DetailPage from "../detail/Detailpage";

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: grid;
  padding-top: 20px;
  justify-items: center;
`;

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

const CardContainer = styled.div`
  display: flex;

  justify-content: flex-start;
  padding: 10px;
  margin: 10px 0 10px 0;
  transition: all ease 0.2s;
  border-radius: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 300;
`;
const Info = styled.span`
  font-size: 14px;
  font-weight: 200;
  color: #98a4b7;
`;
const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: white;
  display: flex;

  width: 50%;
  justify-content: flex-start;
  padding: 10px;
  margin: 10px 0 10px 0;
  transition: all ease 0.2s;
  border-radius: 10px;
  /* background-color: #3a3a3a; */
  :hover {
    transform: scale(1.03);
    box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.8);
  }

  img {
    background-color: #3a3a3a;
    width: 70px;
    border-radius: 3px;
  }
  @media (max-width: 767px) {
    width: 80%;
  }
`;

const ContentList = ({ contents }) => {
  const [clicked, setClicked] = useState();

  const handleCardClick = (id) => {
    setClicked(contents.find((el) => el.id === id));
  };

  if (!contents) return;
  return contents.map((content) => {
    return (
      <StyledLink
        to={{
          pathname: `/detail/${content.id}/${content.media_type.toLowerCase()}`,
        }}
      >
        <CardContainer
          key={content.id}
          onClick={() => handleCardClick(content.id)}
        >
          <img src={content.poster_path} alt="content poster" />
          <UserInfo>
            <Title>{content.title}</Title>
            <Info>
              {content.media_type} · {content.date}
            </Info>
          </UserInfo>
          {/* {clicked && <DetailPage clicked={clicked} setClicked={setClicked} />} */}
        </CardContainer>
      </StyledLink>
    );
  });
};

const SearchResult = () => {
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
    const getSearchContent = async () => {
      return await fetch(`/search?query=${search}`)
        .then((res) => {
          if (!res.ok) {
            return new Promise.reject("no content found");
          }
          return res.json();
        })
        .then((list) => {
          setContents(list);
        })
        .catch((err) => console.error(err));
    };
    if (search) getSearchContent();
  }, [search]);

  return (
    <div>
      <MainWrapper>
        <SearchBarWrapper onClick={() => handleClick()}>
          <IoSearch size="40" color="#B0B0B0" style={{ padding: 10 }} />
          <SearchBar
            type="search"
            placeholder="search"
            onChange={handleInputChange}
          />
        </SearchBarWrapper>
      </MainWrapper>

      <ContentWrapper>
        {search ? <ContentList contents={contents} /> : ""}
      </ContentWrapper>
    </div>
  );
};

export default SearchResult;
