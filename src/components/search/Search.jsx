import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "../../store/store";
import { setIsLoggedin } from "../../store/loginReducer";

const SearchBarWrapper = styled.div`
  position: relative;
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

const LoginButton = styled.button`
  position: absolute;
  right: 10px;
  background-color: #3a3a3a;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 17px;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s ease;
  z-index: 1;

  &:hover {
    background-color: #555555;
  }
`;

const Search = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search");
  };

  const [search, setSearch] = useState("");
  const [contents, setContents] = useState(null);
  const [loginState, setLoginState] = useState("Login");
  const isLoggedin = useSelector((state) => state.loginSlice);
  const dispatch = useDispatch();

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

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleMainButtonClick = (e) => {
    e.stopPropagation();
    console.log(isLoggedin);
    if (isLoggedin === true) {
      dispatch(setIsLoggedin((cur) => !cur));
    } else {
      dispatch(setIsLoggedin((cur) => !cur));
      navigate("/");
    }
  };

  const loginButtonText = { isLoggedin } ? "Logout" : "Login";
  return (
    <>
      <SearchBarWrapper onClick={() => handleClick()}>
        <IoSearch size="40" color="#B0B0B0" style={{ padding: 10 }} />
        <SearchBar
          type="search"
          placeholder="search"
          onChange={handleInputChange}
        />
        <LoginButton size="40" onClick={handleMainButtonClick}>
          {loginButtonText}
        </LoginButton>
      </SearchBarWrapper>
    </>
  );
};

export default Search;
