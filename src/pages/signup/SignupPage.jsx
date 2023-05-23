import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";

const SignupWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  min-height: 0;
`;

const SignupHead = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: black;
  z-index: 9000;
  height: 56px;
`;

const SignupNav = styled.div`
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

const SignupTitle = styled.h1`
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

const SignupInputWrapper = styled.div`
  padding-top: 70px;
  min-height: calc(var(--vh)*100 - 56px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SignupForm = styled.form`
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

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: black;
  color: #fff;
  cursor: pointer;
`;




const SignupPage = () => {
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

    // todo : 회원가입 처리 로직 작성

    console.log("회원가입 정보:", username, password);

    // todo : 회원가입 완료 후 리다이렉트 등 처리할 수 있음
  };

  return (
    <SignupWrapper>
      <SignupHead>
        <SignupNav>
          <SignupTitle>회원가입</SignupTitle>
          <BackLink to="/login">
            <BiArrowBack />
          </BackLink>
        </SignupNav>
      </SignupHead>
      
      <SignupInputWrapper>
        <SignupForm onSubmit={handleSubmit}>
          <FormField>
            <Label>사용자명:</Label>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormField>
          <FormField>
            <Label>비밀번호:</Label>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormField>
          <Button type="submit">가입하기</Button>
        </SignupForm>
      </SignupInputWrapper>
      
    </SignupWrapper>
  );
};

export default SignupPage;