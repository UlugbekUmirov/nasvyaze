import styled from "styled-components";

export const Container = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 1126px;
  margin-top: 50px;
  & .body {
    display: flex;
    & .filter {
      min-width: 245px;
      margin-right: 25px;
      & .client {
        & label {
          margin-bottom: 17px;
          display: flex;
          text-align: center;
          & p {
            margin: 0;
            margin-top: 3px;
          }
          & .checkbox {
            border-radius: 5px;
            width: 20px;
            height: 20px;
            margin-right: 12px;
          }
        }
      }
      & .InputMask {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: black;
        padding: 16px 27px 16px 16px;
        font-family: "Rubik";
        opacity: 0.98;
        outline: none;
        border: 1px solid #e2e6e9;
        border-radius: 8px;
        margin-bottom: 92px;
        ::placeholder{
          color: #6f818f;
        }
        @media (max-width: 1000px) {
          margin-bottom: 50px;
        }
      }
      & .clear {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #6f818f;
        background: #f6f6f6;
        margin-bottom: 50px;
        border-radius: 8px;
        padding: 16px 31.5px;
        border: none;
        font-family: "Rubik";
        cursor: pointer;
        display: block;
      }
      @media (max-width: 1000px) {
        margin-bottom: 30px;
      }
    }
    & .results {
      width: 100%;
      & .title {
        display: flex;
        justify-content: space-between;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: #001d56;
        text-align: center;
        margin-bottom: 22px;
        margin-right: 20px;
        & div {
          margin-top: 10px;
          @media (max-width: 400px) {
            font-size: 17px;
          }
        }
        & img {
          cursor: pointer;
        }
      }
      max-width: 809px;
      @media (max-width: 1000px) {
        text-align: center;
        max-width: 100%;
      }
    }
    @media (max-width: 1200px) {
      padding: 0px 20px;
    }
    @media (max-width: 1000px) {
      display: block;
    }
  }
`;
