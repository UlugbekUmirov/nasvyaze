import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { IoMdClose } from "react-icons/io";

const Main = styled.div`
  & .layer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.6;
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .cardfiltermain {
    position: absolute;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    & .cardfilter {
      position: fixed;
      min-height: 200px;
      max-width: 600px;
      background: #fff;
      overflow: hidden;
      border-radius: 12px;
      @media only screen and (max-width: 784px) and (min-width: 320px) {
        width: 95%;
      }
      & .tekst {
        width: 638px;
        padding-left: 44px;
        min-height: 270px;
        padding-right: 54px;
        @media (max-width: 600px) {
          padding-left: 20px;
          padding-right: 20px;
          width: 90%;
        }
        & div {
          margin: 10px 10px 10px 0px;
          font-weight: 500;
          font-size: 18px;
          color: #223260;
          width: auto;
          & span {
            color: #8f939a;
          }
        }
      }
      & .titlee {
        display: flex;
        justify-content: space-between;
        padding: 0px 42px 0px 42px;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        margin-top: 30px;
        p {
          margin: 0;
          color: #223260;
        }
        img {
          cursor: pointer;
        }
      }
      .t1 {
        padding: 0 15px 15px 15px;
      }
    }
    & .btnOk {
      height: 48px;
      background: #ffffff;
      border: 1px solid #ced5dc;
      border-radius: 12px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      width: 100%;
      display: block;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      color: #223346;
      outline: none;
    }
    & .yesNoBtnGroup {
      display: flex;
      margin: 25px 90px 30px 90px;
      button {
        height: 48px;
        background: #eaf2f9;
        border: none;
        border-radius: 12px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 100%;
        display: block;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        line-height: 18px;
        color: #4f89cb;
        outline: none;
        cursor: pointer;
        &:nth-child(1) {
          margin-right: 37px;
          @media (max-width: 700px) {
            margin-right: 15px;
          }
        }
        &:nth-child(2) {
          background: #4f89cb;
          color: #eaf2f9;
        }
      }
      @media (max-width: 700px) {
        margin: 30px;
      }
    }
  }
`;

const BodyHidden = createGlobalStyle`
      body{
            overflow: hidden;
      }
`;

const ModalInfoForm = (props) => {
  const { close, info } = props;
  return (
    <>
      <Main>
        <div className="layer" />
        <div className="cardfiltermain">
          <div className="cardfilter">
            <div className="titlee">
              <p className="to"></p>
              <div className="t1"></div>
              <div>
                <div style={{ cursor: "pointer" }} onClick={() => close(false)}>
                  <IoMdClose></IoMdClose>
                </div>
              </div>
            </div>
            <div className="tekst">
              <div>{info}</div>
            </div>
          </div>
        </div>
        <BodyHidden />
      </Main>
    </>
  );
};
export default ModalInfoForm;
