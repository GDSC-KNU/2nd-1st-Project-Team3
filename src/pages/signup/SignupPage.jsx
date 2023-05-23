import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const SignupWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Signup = () => {
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
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>아이디:</Label>
          <Input type="text" value={account} onChange={handleAccountChange} />
        </FormGroup>
        <FormGroup>
          <Label>비밀번호:</Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>닉네임:</Label>
          <Input type="text" value={nickname} onChange={handleNicknameChange} />
        </FormGroup>
        <FormGroup>
          <Label>이름:</Label>
          <Input type="text" value={name} onChange={handleNameChange} />
        </FormGroup>
        <FormGroup>
          <Label>이메일:</Label>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormGroup>
        <Button type="submit">회원가입</Button>
        <Button type="button" onClick={handleLoginClick}>
          로그인
        </Button>
      </Form>
    </SignupWrapper>
  );
};

export default Signup;
