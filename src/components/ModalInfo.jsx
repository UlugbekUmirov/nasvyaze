import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer } from "react-toastify";
import { MdContentCopy } from "react-icons/md";
import { get } from "lodash";
import Moment from "react-moment";
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
      min-height: 445px;
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

const ModalInfo = (props) => {
  const [copyy, setCopy] = useState("");
  const copy = useRef(null);
  const {
    title0,
    title1,
    close,
    send_group,
    statusYesN,
    del,
    obj2,
    onCopyText,
    obj,
    notify,
    objList,
  } = props;

  useEffect(() => {
    const copyy = copy.current;

    setCopy(copyy.innerText);
  }, []);
  const codeSnippet = `${copyy}`;

  return (
    <Main>
      <div className="layer" />

      <div className="cardfiltermain">
        <div className="cardfilter">
          <div className="titlee">
            {title0 ? <p className="t0">{title0}</p> : null}
            {title1 ? <p className="t1">{title1}</p> : null}

            <CopyToClipboard
              text={codeSnippet}
              //onClick={notify}
              //  onCopy={onCopyText}
            >
              <div>
                <ToastContainer style={{ color: "rebeccapurple" }} />
                <MdContentCopy
                  className="MdContentCopy"
                  onClick={notify}
                  color="#4F89CB"
                  size={"1.5em"}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </CopyToClipboard>
          </div>
          <div id="copy" ref={copy} className="tekst">
           
            {obj?.answers.map((anasrersItem, i) => {
              return (
                <div>
                  {objList.map((item, index) => (
                    <>
                      {item.type === 1 ? (
                        <div>
                          {item.label ? item.label : ""}:{" "}
                          <span>
                            {get(
                              get(obj, `answers[${i}]`, []).find(
                                (qq) => qq.question === item.id
                              ),
                              "answer",
                              ""
                            )}
                          </span>
                        </div>
                      ) : item.type === 2 ? (
                        <div>
                          {item.label ? item.label : ""}:{" "}
                          <span>
                            {get(
                              get(obj, `answers[${i}]`, []).find(
                                (qq) => qq.question === item.id
                              ),
                              "answer",
                              ""
                            )}
                          </span>
                        </div>
                      ) : item.type === 3 ? (
                        <div>
                          {item.label ? item.label : ""}:{" "}
                          <span>
                            {get(
                              get(obj, `answers[${i}]`, []).find(
                                (qq) => qq.question === item.id
                              ),
                              "answer",
                              ""
                            )}
                          </span>
                        </div>
                      ) : item.type === 4 ? (
                        <div>
                          {item.label ? item.label : ""}:{" "}
                          <span>
                            {
                              get(
                                get(obj, `answers[${i}]`, []).find(
                                  (qq) => qq.question === item.id
                                ),
                                "answer",
                                ""
                              )?.label
                            }
                          </span>
                        </div>
                      ) : item.type === 5 ? (
                        <div>
                          {item.label ? item.label : ""}:{" "}
                          <span>
                            {get(
                              get(obj, `answers[${i}]`, []).find(
                                (qq) => qq.question === item.id
                              ),
                              "answer",
                              ""
                            )?.map((e) => e?.label)}
                          </span>
                        </div>
                      ) : item.type === 6 ? (
                        <div>
                          {item.label ? item.label : ""}:{" "}
                          <span>
                            <Moment format="DD-MM-YYYY HH:mm">
                              {get(
                                get(obj, `answers[${i}]`, []).find(
                                  (qq) => qq.question === item.id
                                ),
                                "answer",
                                ""
                              )}
                            </Moment>
                          </span>
                        </div>
                      ) : item.type === 7 ? (
                        <div>
                          {item.label ? item.label : ""}:{" "}
                          <span>
                            {get(
                              get(obj, `answers[${i}]`, []).find(
                                (qq) => qq.question === item.id
                              ),
                              "answer",
                              ""
                            )
                              .replace(/-/g, "")
                              .replace(/\(/g, "")
                              .replace(/\)/g, "")
                              .replace(/\s/g, "")
                              .replace(/_/g, "")}
                          </span>
                        </div>
                      ) : item.type === 8 ? (
                        <div>
                          {item.label ? item.label : ""}:{" "}
                          <span>
                            {get(
                              get(obj, `answers[${i}]`, []).find(
                                (qq) => qq.question === item.id
                              ),
                              "answer",
                              ""
                            )}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </div>
              );
            })}
          </div>
          {statusYesN === true ? (
            <div className="yesNoBtnGroup">
              <button onClick={() => close(false)}>Отменить</button>
              <CopyToClipboard text={codeSnippet} onCopy={onCopyText}>
                <button onClick={del}>
                  {send_group ? `Копировать и отправить` : `Копировать`}
                </button>
              </CopyToClipboard>
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

export default ModalInfo;
