import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const BackGround = styled.div`
  background: black;
  height: 100vh;
  font-family: "nanumsquare";
`;

const StyledWord = styled.div`
  margin-top: 800px;
  color: white;
  text-align: center;
  opacity: 0;
  transition: opacity 0.7s;
`;

const Start = styled.div`
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 2%;
  border-radius: 10px;
  color: white;
`;

// 이 자리에 3d model file을 넣고 싶은데.......
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 400px;
  ${(props) =>
    props.isInView &&
    css`
      height: 50vh;
    `}
`;

const ResponsiveImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Intro = () => {
  const navigate = useNavigate();
  const wordRefs = useRef([]);
  const imageRef = useRef(null);
  const [isImageInView, setImageInView] = useState(false);
  const [oMo, setoMo] = useState("omo");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
          } else {
            entry.target.style.opacity = 0;
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    wordRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageIntersection = (entries) => {
    entries.forEach((entry) => {
      setImageInView(entry.isIntersecting);
      if (entry.isIntersecting) {
        setoMo("oMo");
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleImageIntersection, options);
    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <BackGround>
        <StyledWord ref={(el) => (wordRefs.current[0] = el)}>
          <h1>안녕하세요!</h1>
        </StyledWord>
        <StyledWord ref={(el) => (wordRefs.current[1] = el)}>
          <h1>흩어져있는 ott 방영 정보를 모아 한눈에 보여 주는</h1>
        </StyledWord>
        <StyledWord ref={(el) => (wordRefs.current[2] = el)}>
          <h1>
            ott 모아{" "}
            <span style={{ color: oMo === "oMo" ? "orange" : "white" }}>
              {oMo}
            </span>{" "}
            입니다!
          </h1>
        </StyledWord>
        <ImageWrapper ref={imageRef} isInView={isImageInView}>
          <ResponsiveImage
            src="https://global-uploads.webflow.com/5e4f771ff45e4c54cb345de3/61401cbff9b93566a1e2d6b0_%2525EB%252589%2525B4%2525EC%25258A%2525A4-%2525EA%2525B7%2525B8%2525EB%2525A6%2525AC%2525EB%252593%25259C-%2525EC%25259D%2525B4%2525EB%2525AF%2525B8%2525EC%2525A7%252580-(2).png"
            alt="logo"
          />
        </ImageWrapper>
        <div style={{ textAlign: "center" }}>
          해당 컨텐츠 검색 부터 찜하기 및 추천정보까지,
          <br />
          지금 바로 OMO를 시작해보세요!
        </div>
        <Start
          onClick={() => {
            navigate("/");
          }}
        >
          시작하기
        </Start>
      </BackGround>
    </>
  );
};

export default Intro;
