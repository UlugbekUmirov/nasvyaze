import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const Main = styled.div`
  .layer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.2;
    z-index: 998;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cardfiltermain {
    position: fixed;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .cardfilter {
    width: 500px;
    min-height: 1px;
    background: #fff;
    overflow: hidden;
    border-radius: 14px;
    @media only screen and (max-width: 784px) and (min-width: 320px) {
      width: 80%;
    }
    .t1 {
      padding: 15px;
      text-align: center;
    }
  }
  .btnOk {
    padding: 10px;
    background: #ced5dc;
    width: 100%;
    height: 38px;
  }
  .yesNoBtnGroup {
    button {
      width: 50%;
      padding: 10px;
      background: #ced5dc;
      border: #ffff;
      height: 38px;
      &:nth-child(1) {
        background: #4F89CB;
        color: #fff;
        border: #ffff;
      }
    }
  }
`;

const BodyHidden = createGlobalStyle`
      body{
            overflow: hidden;
      }
`;

const Modal = (props) => {
  const { title, close, statusYesN, del } = props;

  return (
    <Main>
      <div className="layer" />
      <div className="cardfiltermain">
        <div className="cardfilter">
          {title ? <p className="t1">{title}</p> : null}

          {statusYesN === true ? (
            <div className="yesNoBtnGroup">
              <button onClick={del}>Да</button>
              <button onClick={() => close(false)}>Отмена</button>
            </div>
          ) : (
            <button onClick={() => close(false)} className="btnOk">
              Хорошо
            </button>
          )}
        </div>
      </div>
      <BodyHidden />
    </Main>
  );
};

export default Modal;
