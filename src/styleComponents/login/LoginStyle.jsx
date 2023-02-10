import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & .body {
    width: 437px;
    margin: 0 32px;

    & .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #000000;
      text-align: center;
      margin-bottom: 22px;
    }

    & .loginForm {
      display: flex;
      flex-direction: column;
      & .eye {
        display: flex;
        justify-content: right;
        & span {
          position: absolute;
          margin-top: 10px;
          margin-right: 10px;
          cursor: pointer;
        }
      }

      & input {
        max-height: 48px;
        background: #ffffff;
        border: 1px solid #ffffff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin-bottom: 21px;
        border-radius: 12px;
        padding: 14px 18px;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
      }
      & input:focus {
        outline: none;
      }
      & .lbtn {
        margin-top: 12px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0193de;
        border: 1px solid #0193de;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #ffffff;
        cursor: pointer;
        margin-left: 183px;
        @media (max-width: 490px) {
          margin-left: 36%;
        }
      }
      & .errs {
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        width: 100%;
        margin-top: 0px;
        margin-bottom: 0px;
        color: red;
        & > div {
          margin: 8px 0;
        }
      }
    }
  }
`;
