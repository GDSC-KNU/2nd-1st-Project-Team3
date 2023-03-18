import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
  font-size: 16px;
  width: 80%;
  background-color: #3a3a3a;
  :focus {
    outline: none;
    color: white;
  }
`;

const Search = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/ranking");
  };

  return (
    <>
      <SearchBarWrapper>
        <IoSearch
          //  onClick={() => handleClick()}
          size="24"
          color="#B0B0B0"
        />
        <SearchBar type="text" placeholder="search" />
      </SearchBarWrapper>
    </>
  );
};

export default Search;
