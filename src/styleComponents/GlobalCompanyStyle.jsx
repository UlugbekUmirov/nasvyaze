import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & .body {
    width: 679px;
    margin: 0 32px;

    // max-width: 679px;
    & .forms {
      //max-width: 324px;
      margin-bottom: 20px;
      width: 100%;
      & .create {
        display: flex;
        justify-content: space-between;
        width: 100%;
        & .input_target:nth-child(1) {
          margin-right: 39px;
        }
        & .input_target3:nth-child(1) {
          margin-right: 24px;
        }
        & .input_target2 {
          margin-top: 24px;
          width: 100%;
          & label {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            display: block;
            margin-bottom: 6px;
          }
          & textarea {
            height: 113px;
            resize: none;
            background: #ffffff;
            border: 1px solid #ced5dc;
            border-radius: 12px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            width: 100%;
            display: block;
            font-weight: 400;
            font-size: 15px;
            padding-left: 15px;
            padding-top: 15px;
            line-height: 18px;
            color: #223346;
            outline: none;
            outline: 0;
            font-family: "Rubik", sans-serif;
          }
        }
        & .input_target3 {
          margin-top: 24px;
          width: 100%;
          justify-content: space-between;
          & label {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            display: block;
            margin-bottom: 6px;
          }
          & input[type="button"] {
            height: 48px;
            border: 1px solid #ced5dc;
            border-radius: 12px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            width: 100%;
            display: block;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            //padding-left: 15px;
            outline: none;
            text-align: center;
          }
          & .button_add {
            color: #4f89cb;
            background-color: #eaf2f9;
            cursor: pointer;
          }
          & .button_copy {
            color: #eaf2f9;
            background-color: #4f89cb;
            cursor: pointer;
            width: 100%;
          }
        }
        & .input_target {
          margin-top: 24px;
          width: 100%;
          justify-content: space-between;
          & label {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            display: block;
            margin-bottom: 6px;
          }
          & input {
            height: 48px;
            background: #ffffff;
            border: 1px solid #ced5dc;
            border-radius: 12px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            width: 100%;
            display: block;
            font-weight: 400;
            font-size: 15px;
            padding-left: 15px;
            line-height: 18px;
            color: #223346;
            outline: none;
            caret-color: #4f89cb;
          }
          @media (max-width: 900px) {
            width: 100%;
          }
        }
        @media (max-width: 900px) {
          display: block;

          width: 100%;
        }
      }
    }
    & .tip {
      text-align: center;
      display: flex;
      @media (max-width: 700px) {
        display: block;
        width: 100%;
      }
      & .card_comp {
        max-width: 360px;
        margin: 24px;
        padding: 36px 67px;

        @media (max-width: 600px) {
          text-align: center;
          margin: 0;
          margin-bottom: 32px;
        }
        & .companyCard {
          text-align: center;
          justify-content: center;
          display: inline;
          justify-content: center;
          text-align: center;
          align-items: center;
          color: black;
          font-weight: 500;
          font-size: 25px;
          line-height: 20px;
          margin-bottom: 32px;

          & span {
            text-align: center;
            :hover {
              color: white;
            }
          }
          :hover {
            color: white;
          }
          @media (max-width: 500px) {
            font-size: 20px;
          }
          p {
            margin: 0;
            margin-bottom: 35px;
          }
        }
      }
    }
    & .title {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #001d56;
      text-align: center;
      margin-bottom: 22px;
      //margin-left: 20px;
      margin-right: 20px;
      & img {
        cursor: pointer;
      }
      @media (max-width: 450px) {
        display: block;
        text-align: left;
      }
    }
    @media (max-width: 900px) {
      width: 100%;
    }
  }
`;
