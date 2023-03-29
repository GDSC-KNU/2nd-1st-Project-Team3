import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: grid;
  justify-items: center;
`;

const Ranking = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    padding: 10px 0 10px 0;
    h1 {
      font-size: 22px;
    }
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: #3a3a3a;
  width: 50%;
  height: 300px;
  margin: 10px 0 10px 0;
  @media (max-width: 767px) {
    width: 80%;
  }
`;

const ImgGrid = styled.div`
  display: grid;
  border-radius: 5px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  width: 50%;
  @media (max-width: 767px) {
    width: 80%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const RankWrapper = styled.div`
  img {
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: #3a3a3a;
    border-radius: 5px;
    border: white;
    height: 300px;
  }
`;

const Main = () => {
  const [content, setContent] = useState([]);
  // const contentId = useRef(0);

  const getContent = async () => {
    try {
      const response = await fetch(`https://ottmowa.kro.kr/ranking`);
      const data = await response.json();
      setContent(data);
      console.log(data);
    } catch (e) {
      console(e);
    }

    // const initContent = response.slice(0, 10).map((it) => {
    //   return {
    //     poster_path: it.poster_path,
    //     title: it.title,
    //     id: contentId.current++,
    //   };
    // });
    // setContent(initContent);
  };

  useEffect(() => {
    getContent();
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/ranking");
  };

  return (
    <>
      <MainWrapper>
        <Search />
      </MainWrapper>
      <ContentWrapper>
        <VideoWrapper>예고편</VideoWrapper>
        <Ranking>
          <div>
            <h1>오늘의 통합 랭킹</h1>
          </div>
          <IoChevronForward size="30" onClick={handleClick} />
        </Ranking>
        {content ? (
          <ImgGrid>
            <RankWrapper>
              {content.map((li) => (
                <Link
                  to={{
                    pathname: `/detail/${li.id}/${li.media_type.toLowerCase()}`,
                  }}
                >
                  <div key={li.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${li.poster_path}`}
                      alt={li.title}
                    />
                    {li.title}
                  </div>
                </Link>
              ))}
            </RankWrapper>

            {/* <RankWrapper>2</RankWrapper>
            <RankWrapper>3</RankWrapper>
            <RankWrapper>4</RankWrapper>
            <RankWrapper>5</RankWrapper>
            <RankWrapper>6</RankWrapper> */}
          </ImgGrid>
        ) : (
          <p>Loading</p>
        )}
      </ContentWrapper>
    </>
  );
};

export default Main;
