import { useEffect, useState } from "react";
import styled from "styled-components";
import "./Detailpage.css";

const Header = styled.div`
  height: 5vh;
  width: 100%;
  background-color: beige;
`;

const Overview = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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
const Poster = styled.img`
  padding: 10%;
  width: 50%;
  height: 400x;
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

const DetailPage = () => {
  const [movieInfo, setMovieInfo] = useState(null);

  const getMovieInfo = async (id) => {
    try {
      const response = await fetch(`https://ottmowa.kro.kr/movie/${id}/info`);
      const data = await response.json();
      setMovieInfo(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 예시 id = 어바웃타임
    getMovieInfo(122906);
  }, []);
  return (
    <>
      {movieInfo ? (
        <div class="detail-page">
          <Header></Header>
          {console.log(movieInfo)}
          <Overview>
            {movieInfo.backdrop_path && (
              <Poster
                src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
                alt={movieInfo.title}
              />
            )}
            <Title>
              <p className="title">{movieInfo.title}</p>
              <p className="eng_title">{movieInfo.original_title}</p>
              <p className="release_date">{movieInfo.release_date}</p>
              <img
                class="poster-back"
                src={`https://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path}`}
                alt={movieInfo.title}
              />
            </Title>
          </Overview>
          {/* Ratings css 필요 */}
          <Ratings></Ratings>
          <Contents>
            <hr></hr>
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
            <hr></hr>
            <Provider>
              <h4>작품 감상</h4>
              <ul>
                {movieInfo.providers.flatList.map((provider) => (
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
            <p>{movieInfo.overview}</p>
            <hr></hr>
            <article class="article-wrap"></article>
            <h4>감독/출연</h4>
            <div class="person-wrap">
              {movieInfo.cast.slice(0, 9).map((cast) => (
                <div class="person">
                  <div class="photo">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      alt={cast.name}
                      className="profile_img"
                    />
                  </div>
                  <div class="person-info">
                    <p>{cast.name}</p>
                    <p>{cast.character}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr></hr>
            <h4>예고편</h4>
            {movieInfo.videos && movieInfo.videos.length > 0 && (
              <>
                {
                  <Video
                    title={movieInfo.title}
                    src={`https://www.youtube.com/embed/${movieInfo.videos[0].key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></Video>
                }
              </>
            )}
            <hr></hr>
            <h4>추천 컨텐츠</h4>
            <div class="recommend-wrap">
              {movieInfo.recommends.slice(0, 9).map((recommends) => (
                <div class="recommend">
                  <div class="recommend-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${recommends.poster_path}`}
                      alt={recommends.title}
                    />
                  </div>
                  <div class="recommend-info">
                    <p>{recommends.title}</p>
                    <p>{recommends.release_date}</p>
                  </div>
                </div>
              ))}
            </div>
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
