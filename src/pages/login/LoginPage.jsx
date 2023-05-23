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

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <LoginWrapper>
      <LoginHead>
        <LoginNav>
          <LoginTitle>로그인</LoginTitle>
          <BackLink to={"/"}>
            <BiArrowBack></BiArrowBack>
          </BackLink>
        </LoginNav>
      </LoginHead>

      <LoginInputWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <FormField>
            <Label>사용자명:</Label>
            <Input
              placeholder="name"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormField>
          <FormField>
            <Label>비밀번호:</Label>
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormField>
          <ButtonWrapper>
            <Button type="submit" primary>
              로그인
            </Button>
            <Button type="button" onClick={handleSignupClick}>
              회원가입
            </Button>
          </ButtonWrapper>
        </LoginForm>
      </LoginInputWrapper>
    </LoginWrapper>
  );
};

export default LoginPage;
