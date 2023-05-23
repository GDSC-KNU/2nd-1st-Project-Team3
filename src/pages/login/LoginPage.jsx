import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const goToMain = () => {
    navigate("/main");
  };

  const showSuccessAlert = () => {
    alert("로그인 성공");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log("로그인 정보:", username, password);

    try {
      const response = await axios.post("https://ottmowa.kro.kr/login", {
        username,
        password,
      });

      const { data } = response;

      if (data.token) {
        // 로그인 성공 시 토큰을 저장하고 사용자 정보를 조회합니다.
        const token = data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          const userResponse = await axios.get(
            "https://ottmowa.kro.kr/user/get"
          );

          const userData = userResponse.data;
          setUser(userData);
          setLoginError(false);
          showSuccessAlert();
          goToMain();
        } catch (error) {
          console.log(error);
          setLoginError(true);
        }
      } else {
        setUser(null);
        setLoginError(true);
      }
    } catch (error) {
      console.log(error);
      setLoginError(true);
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
      {loginError && <p>아이디 혹은 비밀번호가 일치하지 않습니다.</p>}
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
