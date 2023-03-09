import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 500px;
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  & .body {
    width: 679px;
    margin: 0 32px;
    & .home-company {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 1rem;
    }
    & .search {
      position: relative;
      width: 100%;
      & input {
        width: 100%;
      }
      & img {
        position: absolute;
        right: 0;
        background-color: white;
      }
    }
    & .formm {
      display: flex;
      align-items: center;
      & div {
        display: flex;
        & .icons-search {
          padding: 0 5px;
          cursor: pointer;
          margin-left: 15px;
        }
      }
      & .filter {
        margin-right: 10px;
      }
      @media (max-width: 500px) {
        display: block;
        & div {
          & .icons-search {
            max-width: 40px;
            max-height: 40px;
            text-align: center;
          }
        }
        & .filter {
          margin: 0;
          margin-right: 10px;
        }
      }
    }
    & .forms {
      margin-bottom: 20px;
      width: 100%;
      & .complaint {
        margin: 10px 0px;
        display: flex;
        justify-content: space-between;
        & div:nth-child(1) {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
        }
        & div:nth-child(2) {
          cursor: pointer;
          max-width: 29px;
          max-height: 14px;
        }
      }
      & .create {
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(324px, 1.6fr));
        gap: 31px;
        & .input_target:nth-child(1) {
          /*     margin-right: 39px; */
        }
        & .input_target3:nth-child(1) {
          margin-right: 24px;
        }
        & .input_target2 {
          /*   margin-top: 24px; */
          width: 100%;
          & label {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            display: block;
            color: #223260;
            margin-bottom: 6px;
          }
          & textarea {
            height: 113px;
            resize: none;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            width: calc(100% - 15px);
            display: block;
            font-weight: 400;
            font-size: 15px;
            padding-left: 15px;
            border: 1px solid #ffffff;
            padding-top: 15px;
            line-height: 18px;
            color: #223346;
            width: 100%!important;
            outline: none;
            outline: 0;
            font-family: "Rubik", sans-serif;
            :focus {
              border: 2px solid #4f89cb;
            }
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
            color: #223260;
          }
          & input[type="button"] {
            height: 48px;
            padding-right: 15px;
            border: none;
            border-radius: 12px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            width: calc(100%);
            display: block;
            font-weight: 700;
            font-size: 14px;

            line-height: 20px;
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
          /*  margin-top: 24px; */

          /*   justify-content: space-between; */
          & label {
            font-weight: 400;
            font-size: 14px;
            display: block;
            margin-bottom: 6px;
            line-height: 20px;
            color: #223260;
          }
          & .date-time {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            font-family: "Rubik", sans-serif;
          }
          & input , & .input{
            height: 44px;
            background: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 12px;
            width: 100%!important;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            width: calc(100% - 30px);
            display: block;
            font-weight: 400;
            font-size: 15px;
            padding-right: 15px;
            padding-left: 15px;
            line-height: 18px;
            color: #223346;
            outline: none;
            caret-color: #4f89cb;
            :focus {
              border: 2px solid #4f89cb;
            }
          }
          @media (max-width: 900px) {
            width: 100%;
          }
        }
        @media (max-width: 900px) {
          display: block;
          width: 100%;
          & .input_target,
          & .input_target2,
          & .input_target3 {
            margin-top: 24px;
          }
        }
      }
      & .create-button {
        width: 100%;
      }
    }
    & .tip {
      text-align: center;
      display: flex;
      justify-content: center;
      @media (max-width: 900px) {
        display: block;
        width: 100%;
      }
      & .card_comp {
        min-width: 360px;
        margin: 24px;
        padding: 36px 0px;
        @media (max-width: 600px) {
          text-align: center;
          margin: 0;
          min-width: 250px;
          margin-bottom: 32px;
        }
        & .companyCard {
          text-align: center;
          justify-content: center;
          display: inline;
          justify-content: center;
          text-align: center;
          align-items: center;
          color: #223260;
          font-weight: 500;
          font-size: 25px;
          line-height: 20px;
          margin-bottom: 32px;

          & span {
            text-align: center;
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
      align-items: center;
      line-height: 24px;
      color: #001d56;
      text-align: center;
      margin-bottom: 22px;
      & .info {
        cursor: pointer;
      }
      & div {
        @media (max-width: 400px) {
          font-size: 17px;
        }
      }
      & img {
        cursor: pointer;
      }
      @media (max-width: 450px) {
        display: block;
        text-align: left;
        margin-top: 10px;
        & div {
          text-align: center;
        }
      }
    }
    @media (max-width: 900px) {
      width: 100%;
    }
  }
  & .complaint-old {
    width: 800px;
  }
`;
