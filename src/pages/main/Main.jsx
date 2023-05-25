import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  iframe {
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: #3a3a3a;
    width: 100%;
    height: 400px;
    margin: 10px 0 10px 0;
  }
  @media (max-width: 767px) {
    width: 80%;
    iframe {
      height: 300px;
    }
  }
  @media (min-width: 768px) {
    width: 50%;
    iframe {
      height: 400px;
    }
  }
`;

const ImgGrid = styled.div``;

const RankWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  img {
    /* display: grid; */
    border-radius: 5px;
    justify-content: center;
    background-color: #3a3a3a;
    border-radius: 5px;
    border: white;
    height: 300px;
    margin: auto;
  }
  h1 {
    display: grid;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }

  @media (max-width: 767px) {
    /* width: 80%; */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .posterImg {
    display: grid;
    align-items: center;
  }
`;

const Main = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState(null);
  const login = useSelector((state) => state.login); // 수정: state.login으로 변경
  console.log(login.user);

  const getContent = async () => {
    try {
      const response = await fetch(`/ranking`);
      const data = await response.json();
      setContent(data);
      // console.log(data);
    } catch (e) {
      console(e);
    }
  };

  const getVideo = async (id) => {
    try {
      const response = await fetch(`/movie/${id}/info`);
      const data = await response.json();
      setVideo(data);
      // console.log(data);
    } catch (e) {
      console(e);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    getVideo(122906);
  }, []);

  const handleClick = () => {
    navigate("/ranking");
  };

  return (
    <>
      <MainWrapper>
        <Search />
      </MainWrapper>
      <ContentWrapper>
        <>
          {video ? (
            <>
              {video.videos && video.videos.length > 0 && (
                <>
                  {
                    <VideoWrapper>
                      <iframe
                        title={video.title}
                        src={`https://www.youtube.com/embed/${video.videos[0].key}?autoplay=1&mute=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </VideoWrapper>
                  }
                </>
              )}
            </>
          ) : (
            <p>Video Loading</p>
          )}
        </>
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
                <div
                  className="posterImg"
                  key={li.id}
                  onClick={() => {
                    navigate(
                      `/detail/${li.id}/${li.media_type.toLowerCase()}`,
                      {
                        state: { account: login.user?.account },
                      }
                    );
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${li.poster_path}`}
                    alt={li.title}
                  />
                  <h1>{li.title}</h1>
                </div>
              ))}
            </RankWrapper>
          </ImgGrid>
        ) : (
          <p>Loading</p>
        )}
      </ContentWrapper>
    </>
  );
};

export default Main;
