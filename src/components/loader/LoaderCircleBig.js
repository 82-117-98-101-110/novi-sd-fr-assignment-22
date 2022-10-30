import styled from "styled-components";

const LoaderCircle = () => (
  <LoaderCircleWrapper>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </LoaderCircleWrapper>
);

export default LoaderCircle;

const LoaderCircleWrapper = styled.div`
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    margin: 2px;
    border: 2px solid #4318ff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #4318ff rgba(255, 255, 255, 0.13) rgba(255, 255, 255, 0.13)
      rgba(255, 255, 255, 0.13);
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
