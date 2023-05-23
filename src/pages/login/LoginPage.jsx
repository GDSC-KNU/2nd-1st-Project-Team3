import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const goToMain = () => {
    navigate("/main");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("로그인 정보:", username, password);

    try {
      const response = await axios.post("https://ottmowa.kro.kr/login", {
        username,
        password,
      });

      const { data } = response;

      if (data) {
        setUser(data);
      } else {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("로그인 실패");
    }
  };

  useEffect(() => {
    if (user) {
      goToMain();
    }
  }, [user]);
  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>사용자명:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">로그인</button>
        <button type="button" onClick={handleSignupClick}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
