import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { HiArrowUpTray, HiMagnifyingGlass } from "react-icons/hi2";
import "./Detailpage.css";

const Header = styled.div`
  height: 5vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5vw;

  a {
    color: white;
  }
  .h_right {
  }
`;

const Title = styled.div`
  .title {
    font-size: 200%;
    font-weight: 800;
  }
  .eng_title,
  .release_date {
    font-size: 100%;
  }
  width: 70%;
  padding: 0;
`;
// const Poster = styled.img`
//   padding: 10%;
//   width: 50%;
//   height: 40vh;
// `;
const BackGroundImg = styled.img`
  width: 100%;
  opacity: 30%;
`;
const Overview = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .Info_wrap {
  }
`;
// icon 가져오기
const Ratings = styled.div``;

const Contents = styled.div`
  .movie_info {
    font-size: 150%;
    font-weight: 600;
  }
  p {
    font-size: 100%;
  }
  h4 {
    font-size: 150%;
  }
`;
const Video = styled.iframe`
  width: 100%;
  height: 60vh;
`;

const Provider = styled.div`
  margin-bottom: 10px;
  h4 {
    font-size: 150%;
    font-weight: 600;
  }
  ul {
    display: flex;
  }
  ul li {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ul li img {
    width: 5rem;
    border-radius: 10px;
    margin: 10px;
  }
`;

const Person = styled.div`
  display: grid;
  width: 90%;
  max-width: 1240px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;

  .profile_img {
    font-size: 30px;
    text-align: center;
    width: 8vw;
    height: 18vh;
    border-radius: 50%;
  }
`;

const Recommend = styled.div`
  display: grid;
  width: 90%;
  max-width: 1240px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  @media (max-width: 375px) {
    grid-template-columns: 2fr 2fr;
    grid-template-rows: auto;
  }
  .item {
    font-size: 30px;
    text-align: center;
    margin: 20px;
    width: 10vw;
  }
`;

const DetailPage = () => {
  const { id, mediaType } = useParams();
  const [mediaInfo, setMediaInfo] = useState(null);

  const getMediaInfo = async (id, mediaType) => {
    try {
      const response = await fetch(
        `https://ottmowa.kro.kr/${mediaType}/${id}/info`
      );
      const data = await response.json();
      setMediaInfo(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMediaInfo(id, mediaType);
  }, [id, mediaType]);

  return (
    <>
      {mediaInfo ? (
        <div class="detail-page">
          <Header>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <BiArrowBack></BiArrowBack>
            </Link>
            <div className="h_right">
              <HiArrowUpTray></HiArrowUpTray>
              <HiMagnifyingGlass></HiMagnifyingGlass>
            </div>
          </Header>
          {console.log(mediaInfo)}
          {/* <Poster
            src={`https://image.tmdb.org/t/p/${mediaInfo.poster_path}`}
            alt={mediaInfo.title}
          /> */}
          <Overview>
            {/* {mediaInfo.backdrop_path && ( */}

            <div className="Info_wrap">
              <Title>
                <p className="title">{mediaInfo.title}</p>
                <p className="eng_title">{mediaInfo.original_title}</p>
                <p className="release_date">{mediaInfo.release_date}</p>
              </Title>
              <BackGroundImg
                src={`https://image.tmdb.org/t/p/w500/${mediaInfo.backdrop_path}`}
                alt={mediaInfo.title}
              />
            </div>
          </Overview>
          {/* Ratings css 필요 */}
          <hr></hr>
          <Ratings>
            <div class="like-wrap">
              <button class="like-button">Like</button>
              <button class="dislike-button">Dislike</button>
            </div>
            <div class="like-detail-wrap">
              <button class="seasonInterest-button">찜하기</button>
              <button class="seasonWatching-button">보는중</button>
              <button class="seasonWatched-button">봤어요</button>
              <button class="seasonReview-button">리뷰쓰기</button>
            </div>
          </Ratings>

          <Contents>
            <hr></hr>
            <Provider>
              <h4>작품 감상</h4>
              <ul>
                {mediaInfo.providers.flatList.map((provider) => (
                  <li key={provider.name}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                      alt={provider.name}
                      className="provider_img"
                    />
                    <span>{provider.name}</span>
                  </li>
                ))}
              </ul>
            </Provider>
            <hr></hr>
            <div className="movie_info">작품 정보</div>
            <p>{mediaInfo.overview}</p>
            <hr></hr>
            <article class="article-wrap"></article>
            <h4>감독/출연</h4>
            <Person>
              {mediaInfo.cast.slice(0, 8).map((cast) => (
                <div class="person">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    alt={cast.name}
                    className="profile_img"
                  />

                  <div class="person-info">
                    <p>{cast.name}</p>
                    <p>{cast.character}</p>
                  </div>
                </div>
              ))}
            </Person>
            <hr></hr>
            <h4>예고편</h4>
            {mediaInfo.videos && mediaInfo.videos.length > 0 && (
              <>
                {
                  <Video
                    title={mediaInfo.title}
                    src={`https://www.youtube.com/embed/${mediaInfo.videos[0].key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></Video>
                }
              </>
            )}
            <hr></hr>
            <h4>추천 컨텐츠</h4>
            <Recommend>
              {mediaInfo.recommends.slice(0, 8).map((recommends) => (
                <div class="container">
                  <img
                    className="item"
                    src={`https://image.tmdb.org/t/p/w500/${recommends.poster_path}`}
                    alt={recommends.title}
                  />

                  <div class="recommend-info">
                    <p>{recommends.title}</p>
                    <p>{recommends.release_date}</p>
                  </div>
                </div>
              ))}
            </Recommend>
            <hr></hr>
          </Contents>
        </div>
      ) : (
        <p>Loading…</p>
      )}
    </>
  );
};

export default DetailPage;
