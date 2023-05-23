import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

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
  letter-spacing: -0.02em;
  color: #efefef;
  transition: all 0.3s ease-in;
`;

const SignupInputWrapper = styled.div`
  padding-top: 70px;
  min-height: calc(var(--vh) * 100 - 56px);
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
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  font-size: 16px;
  border-radius: 5px;
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
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      account,
      password,
      nickname,
      name,
      email,
    };

    console.log(userData);

    try {
      const response = await axios.post(
        "https://ottmowa.kro.kr/register",
        userData
      );

      if (response && response.data) {
        console.log(response.data);
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      console.log(error);
      alert("회원가입 실패");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
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
            <Label>아이디:</Label>
            <Input type="text" value={account} onChange={handleAccountChange} />
          </FormField>
          <FormField>
            <Label>비밀번호:</Label>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormField>
          <FormField>
            <Label>닉네임:</Label>
            <Input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </FormField>
          <FormField>
            <Label>이름:</Label>
            <Input type="text" value={name} onChange={handleNameChange} />
          </FormField>
          <FormField>
            <Label>이메일:</Label>
            <Input type="text" value={email} onChange={handleEmailChange} />
          </FormField>
          <Button type="submit">회원가입</Button>
          <Button type="button" onClick={handleLoginClick}>
            로그인
          </Button>
        </SignupForm>
      </SignupInputWrapper>
    </SignupWrapper>
  );
};

export default SignupPage;
