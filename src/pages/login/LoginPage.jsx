import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";

const LoginWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  min-height: 0;
`;

const LoginHead = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: black;
  z-index: 9000;
  height: 56px;
`;

const LoginNav = styled.div`
  position: relative;
  width: 50%;
  margin: 0 auto;
  margin-top:10px;
  overflow: hidden;
  justify-content: space-between;
`;

const BackLink = styled(Link)`
  position: absolute;
  left: 6px;
  top: 12px;
  color: #efefef;
  z-index: 9001;
  }
`;

const LoginTitle = styled.h1`
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
  letter-spacing: -.02em;
  color: #efefef;
  transition: all .3s ease-in;
`;

const LoginInputWrapper = styled.div`
  padding-top: 70px;
  min-height: calc(var(--vh)*100 - 56px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  color: white;
  text-align: left;
`;

const Input = styled.input`
  align-items: center;
  width: 100%;
  margin-top:20px;
  margin-bottom:20px;
  padding: 20px;
  font-size: 16px;
  border-radius:5px;
  border: 1px solid rgb(58, 58, 58);
  background-color: rgb(58, 58, 58);
  boxshadow: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
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

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // todo : 로그인 처리 로직 작성

    console.log("로그인 정보:", username, password);
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