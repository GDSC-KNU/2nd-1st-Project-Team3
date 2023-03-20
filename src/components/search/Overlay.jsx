import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const Overlay = () => {
  return <Container></Container>;
};

export default Overlay;
