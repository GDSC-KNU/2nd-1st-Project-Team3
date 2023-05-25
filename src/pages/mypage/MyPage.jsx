import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedin } from "../../store/loginReducer";

const MypageWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  min-height: 0;
`;

const MypageHead = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: black;
  z-index: 9000;
  height: 56px;
`;

const MypageNav = styled.div`
  position: relative;
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
  overflow: hidden;
  justify-content: space-between;
`;

const BackLink = styled(Link)`
  position: absolute;
  left: 6px;
  top: 12px;
  color: #efefef;
  z-index: 9001;
`;

const MypageTitle = styled.h1`
  margin: 0 auto;
  padding: 0 60px;
  box-sizing: border-box;
  max-width: 700px;
  height: 56px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 56px;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;
  letter-spacing: -0.02em;
  color: #efefef;
  transition: all 0.3s ease-in;
`;

const MypageContent = styled.div`
  padding-top: 70px;
  min-height: calc(var(--vh) * 100 - 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  color: white;
`;

const FavoritesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FavoriteItem = styled.li`
  font-size: 16px;
  color: white;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin:auto;
  background-color: black};
  color: #fff;
  cursor: pointer;
`;

const Mypage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedin = useSelector((state) => state.login.isLoggedin);
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      // 즐겨찾기 리스트를 가져오는 비동기 함수
      const fetchFavorites = async () => {
        try {
          // 즐겨찾기 리스트를 가져오는 API 호출 또는 데이터 처리 로직
          const response = await axios.get("/api/favorites");
          setFavorites(response.data);
        } catch (error) {
          console.error("Failed to fetch favorites:", error);
        }
      };
  
      if (isLoggedin) {
        fetchFavorites();
      }
    }, [isLoggedin]);
  
    const handleLogout = () => {
      dispatch(setIsLoggedin(false));
      navigate("/");
    };
  
    return (
      <MypageWrapper>
        <MypageHead>
          <MypageNav>
            <MypageTitle>마이페이지</MypageTitle>
            <BackLink to={"/"}>
              <BiArrowBack />
            </BackLink>
          </MypageNav>
        </MypageHead>
  
        <MypageContent>
          {isLoggedin && (
            <UserInfo>로그인된 계정: {isLoggedin}</UserInfo>
          )}
  
          <FavoritesList>
            <h3>즐겨찾기 리스트</h3>
            {favorites.map((favorite) => (
              <FavoriteItem key={favorite.id}>{favorite.name}</FavoriteItem>
            ))}
          </FavoritesList>
  
          <Button onClick={handleLogout}>로그아웃</Button>
        </MypageContent>
      </MypageWrapper>
    );
  };
  
  export default Mypage;
  