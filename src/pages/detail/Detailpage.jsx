import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { HiArrowUpTray, HiMagnifyingGlass } from "react-icons/hi2";
import "./Detailpage.css";
import { useDispatch, useSelector } from "react-redux";
import { isWatched } from "../../store/watched";
import { HiOutlineBookmark, HiOutlineBookmarkSlash } from "react-icons/hi2";

const Header = styled.div`
  height: 5vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5vw;
  position: sticky;
  top: 0;
  background-color: #000000;
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
  width: 100%;
  padding: 0;
`;

const BackGroundImg = styled.div`
  .movie_backdrop {
    width: 100%;

    opacity: 30%;
    position: relative;
  }
`;
const Overview = styled.div`
  display: flex;
  width: 100%;
  .Info_wrap {
    justify-content: space-between;
    align-items: flex-end;
    .Info_container {
      position: relative;
      width: 100%;
      display: flex;
      align-items: left;
      .movie_poster {
        margin-right: 5px;
        z-index: 3;
        display: flex;
        img {
          width: 100%;
          height: 143px;
          object-fit: cover;
          border-radius: 6px;
        }
      }
    }
  }
`;
const Ratings = styled.div`
  margin-top: 20px;
  width: 100%;
  position: relative;
  padding: 0 10px;
  .like-wrap {
    display: flex;
    .like-button {
      margin-right: 10px;
      background: rgb(58, 58, 58);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 53px;
      letter-spacing: -0.1px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      font-family: -apple-system, sans-serif, Dotum, NotoSansKR, system-ui,
        Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica,
        "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 16px;
      word-spacing: 1px;
      color: #fff;
    }
    .dislike-button {
      background: rgb(58, 58, 58);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 53px;
      letter-spacing: -0.1px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      font-family: -apple-system, sans-serif, Dotum, NotoSansKR, system-ui,
        Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica,
        "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 16px;
      word-spacing: 1px;
      color: #fff;
    }
  }
  .rating-button-wrap {
    margin-top: 12px;
    display: flex;

    .state-button-wrap {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      position: relative;
      .season-button {
        background: black;
        border: none;
        outline: 0;
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
        svg {
          fill: #586a85;
          width: 32;
          height: 32;
        }
        p {
          margin-top: 2px;
          font-size: 12px;
          font-weight: 400;
          color: #98a4b7;
          line-height: 14px;
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
        }
      }
    }
  }
`;
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
  object-fit: cover;
  height: 60vh;
  justify-content: center;
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
  object-fit: cover;
  display: grid;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-content: center;
  .person {
    justify-content: center;
    text-align: center;
    padding: 10px;
  }
  .profile_img {
    justify-content: center;
    object-fit: cover;
    font-size: 20px;
    text-align: center;
    width: 8vw;
    height: 18vh;
    border-radius: 50%;
  }
  .person-info {
    justify-content: center;
    text-align: center;
    font-size: 15px;
  }
`;

const Recommend = styled.div`
  justify-content: center;
  display: grid;
  width: 100%;
  max-width: 1240px;
  display: grid;
  top: 50%;
  left: 50%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  @media (max-width: 375px) {
    grid-template-columns: 2fr 2fr;
    grid-template-rows: auto;
    margin: auto;
  }
  .item {
    top: 50%;
    left: 50%;
    font-size: 30px;
    margin: px;
    width: 10vw;
  }
  .recommend-info {
    padding: 1px;
  }
  .recommend-title {
    text-align: left;
    font-size: 15px;
  }
  .container {
    margin: auto;
  }
`;

const DetailPage = () => {
  const { id, mediaType } = useParams();
  const [mediaInfo, setMediaInfo] = useState(null);
  const dispatch = useDispatch();
  const watched = useSelector((state) => state.watched);
  console.log(watched);
  const [isBookmark, setIsBookmark] = useState(false);

  const location = useLocation();
  const account = location.state && location.state.account;

  const handleToggle = () => {
    setIsBookmark((prevState) => !prevState);

    const flag = isBookmark ? "uncheck" : "check";

    fetch(`/like/${flag}`, {
      method: "POST",
      body: JSON.stringify({
        account,
        id,
        mediaType,
      }),
    })
      .then((response) => {
        console.log("API 호출 성공,", response.status);
        // 현재 401 에러 뜸. 호출은 성공했으나 account가 넘어가지 않는 상태
      })
      .catch((error) => {
        console.log("API 호출 중 오류 발생", error);
      });
  };

  const getMediaInfo = async (id, mediaType) => {
    try {
      const response = await fetch(`/${mediaType}/${id}/info`);
      const data = await response.json();
      setMediaInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMediaInfo(id, mediaType);
  }, [id, mediaType]);

  const handleWatched = () => {
    dispatch(isWatched());
  };

  return (
    <>
      {mediaInfo ? (
        <div class="detail-page">
          <Header>
            <Link to={"/main"} style={{ textDecoration: "none" }}>
              <BiArrowBack></BiArrowBack>
            </Link>
            <div className="h_right">
              <HiArrowUpTray></HiArrowUpTray>
              <Link to={"/search"} style={{ textDecoration: "none" }}>
                <HiMagnifyingGlass></HiMagnifyingGlass>
              </Link>
            </div>
          </Header>
          {console.log(mediaInfo)}
          {console.log(mediaInfo.id)}
          <Overview>
            <div className="Info_wrap">
              <BackGroundImg>
                <img
                  class="movie_backdrop"
                  src={`https://image.tmdb.org/t/p/w500/${mediaInfo.backdrop_path}`}
                  alt={mediaInfo.title}
                />
              </BackGroundImg>
              <div class="Info_container">
                <Title>
                  <p className="title">{mediaInfo.title}</p>
                  <p className="eng_title">{mediaInfo.original_title}</p>
                  <p className="release_date">{mediaInfo.release_date}</p>
                </Title>
                <div class="movie_poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${mediaInfo.poster_path}`}
                    alt={mediaInfo.title}
                  />
                </div>
              </div>
            </div>
          </Overview>

          <hr></hr>
          <Ratings>
            <div class="like-wrap">
              <button class="like-button">
                <svg
                  data-v-e9f48cf4=""
                  width="32"
                  height="32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  class=""
                >
                  <path
                    data-v-e9f48cf4=""
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12zm-16 0a1.333 1.333 0 100-2.666A1.333 1.333 0 0012 16zm4 8.134A8.003 8.003 0 018.454 18.8h1.725a6.401 6.401 0 0011.64 0h1.724A8.003 8.003 0 0116 24.134zm5.333-9.467a1.333 1.333 0 11-2.667 0 1.333 1.333 0 012.667 0z"
                    fill="#586A85"
                  ></path>
                </svg>
                <p>좋아요</p>
              </button>
              <button class="dislike-button">
                <svg
                  data-v-e9f48cf4=""
                  width="32"
                  height="32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  class=""
                >
                  <path
                    data-v-e9f48cf4=""
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12zm-9.473-2.122l3.863-1.035.415 1.546-3.864 1.035-.414-1.546zm-5.056 0l-3.863-1.035-.415 1.546 3.864 1.035.414-1.545zM16 18.668a7.997 7.997 0 016.93 4h-1.933a6.388 6.388 0 00-4.997-2.4 6.388 6.388 0 00-4.996 2.4H9.07a7.997 7.997 0 016.93-4z"
                    fill="#586A85"
                  ></path>
                </svg>
                <p>싫어요</p>
              </button>
            </div>
            <div class="rating-button-wrap">
              <div class="state-button-wrap">
                <button class="season-button" onClick={handleToggle}>
                  {isBookmark ? (
                    <HiOutlineBookmark size="32" />
                  ) : (
                    <HiOutlineBookmarkSlash size="32" />
                  )}
                  <p class="text">찜하기</p>
                </button>
              </div>
              <div class="state-button-wrap">
                <button class="season-button">
                  <svg
                    data-v-e9f48cf4=""
                    width="32"
                    height="32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class=""
                  >
                    <path
                      data-v-e9f48cf4=""
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M28.784 14.794c-4.01-5.263-8.372-7.93-12.97-7.789-3.711.103-6.82 1.995-9.019 3.884-2.2 1.89-3.507 3.793-3.615 3.952v.001c-.25.373-.238.855.028 1.214 4.06 5.47 8.388 8.277 12.88 8.277.159 0 .318-.006.473-.011h.001c3.682-.162 6.707-2.179 8.827-4.178 2.122-2 3.357-4 3.459-4.17.224-.372.2-.834-.064-1.18l-.133.093.133-.093zm-17.164.788c0-2.444 2.072-4.436 4.62-4.436 2.546 0 4.618 1.992 4.618 4.436 0 2.445-2.072 4.437-4.619 4.437-2.547 0-4.619-1.992-4.619-4.436z"
                      fill="#98A4B7"
                    ></path>
                  </svg>
                  <p class="text">보는중</p>
                </button>
              </div>
              <div class="state-button-wrap">
                <button class="season-button" onClick={handleWatched}>
                  <svg
                    data-v-e9f48cf4=""
                    width="32"
                    height="32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class=""
                  >
                    <path
                      data-v-e9f48cf4=""
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.173 10.031a2 2 0 00-2.828.016L13.5 20.002l-4.266-4.219a2 2 0 10-2.813 2.845l5.689 5.625a2 2 0 002.828-.016l.005-.006L26.19 12.86a2 2 0 00-.016-2.829z"
                      fill="#EFEFEF"
                    ></path>
                  </svg>
                  <p class="text">봤어요</p>
                </button>
              </div>
              <div class="state-button-wrap">
                <button class="season-button">
                  <svg
                    data-v-e9f48cf4=""
                    width="32"
                    height="32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class=""
                  >
                    <path
                      data-v-e9f48cf4=""
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.114 7.5a.677.677 0 00-.96 0l-1.49 1.491a1.003 1.003 0 00-.002 1.416l3.936 3.952a.997.997 0 001.412.001l1.492-1.492a.68.68 0 000-.961L20.115 7.5zm-3.525 3.976a.999.999 0 00-1.414-.001l-7.67 7.662a.68.68 0 00-.2.48l-.004 4.4c0 .375.304.68.678.68l4.263.004c.266 0 .52-.105.708-.293l7.576-7.568c.39-.39.392-1.024.002-1.415l-3.939-3.949z"
                      fill="#EFEFEF"
                    ></path>
                  </svg>
                  <p class="text">리뷰쓰기</p>
                </button>
              </div>
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
            <div class="video-wrap">
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
            </div>
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
                    <p class="recommend-title">{recommends.title}</p>
                    <p class="recommend-releaseData">
                      {recommends.release_date}
                    </p>
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
