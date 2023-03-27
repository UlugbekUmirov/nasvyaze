import { get } from "lodash";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "../../styleComponents/MyApplication/MyApplication";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import Axios from "../../utils/httpClient";
import Loyout from "../sections/loyout/Loyout";
import InputMask from "react-input-mask";
import UIResult from "../../styleComponents/UiComponents/UIResult";
import { MdContentCopy } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import Select from "react-select";
import { Pagination } from "@nextui-org/react";
import { CSmartPagination } from "@coreui/react-pro";

export default function Applications() {
  const [company, setCompany] = useState([]);
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(
    searchParams.get("page") ? searchParams.get("page") : 1
  );
  const [copyy, setCopy] = useState("");
  const [answer, setAnswer] = useState(
    searchParams.get("company") ? searchParams.get("company") : ""
  );
  const [phone, setPhone] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => toast(`Copied!`);
  const copy = useRef(null);
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {
    getCompany();
    const c = searchParams.get("company") ? searchParams.get("company") : "";
    const p = searchParams.get("search") ? searchParams.get("search") : "";
    const pg = searchParams.get("page") ? searchParams.get("page") : 1;
    setAnswer(c);
    setPhone(p);
    setPage(pg);
    getlist(p, c);
    //setCopy(copy.current.innerText);
  }, [searchParams]);
  const codeSnippet = `
  ${copyy}
 `;

  const getCompany = () => {
    setMainLoading(true);
    Axios()
      .get("/api/v1/questionnaire/companys/")
      .then((res) => {
        setCompany(get(res, "data", []));
      })
      .finally(() => {
        setMainLoading(false);
      });
  };
  const Client = (ee) => {
    setAnswer(ee.target.value);
    const inputValueToUrll = encodeURI(ee.target.value);

    // getlist(
    //   searchParams.get("phone") ? searchParams.get("phone") : "",
    //   ee.target.value
    // );
    setPage(1);
    navigate(
      "./?company=" + inputValueToUrll + (phone ? "&search=" + phone : "")
    );
  };
  const PhoneNum = (e) => {
    setPhone(e.target.value);
    const inputValueToUrl = encodeURI(
      e.target.value
        .replace(/-/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\+/g, "")
        .replace(/\s/g, "")
        .replace(/_/g, "")
    );

    if (
      e.target.value
        .replace(/-/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\+/g, "")
        .replace(/\s/g, "")
        .replace(/_/g, "")
        .toString().length === 12
    ) {
      // getlist(
      //   e.target.value,
      //   searchParams.get("company") ? searchParams.get("company") : ""
      // );
      navigate(
        "./?search=" + inputValueToUrl + (answer ? "&company=" + answer : "")
      );
    }
  };
  const Clear = () => {
    setAnswer("");
    setPhone("");
    setPage("1");
    setSearchParams({
      page: "1",
    });
    navigate("/my-applications");
  };
  const getlist = (phoneNum = phone, Client = answer) => {
    //setCopy(copy.current.innerText);
    setMainLoading(true);
    Axios()
      .get(
        `/api/v1/application/list/?is_my=1&per_page=10` +
          (Client !== "" ? `&company=${Client}` : "") +
          (page !== "" ? "&page=" + page : "&page=1") +
          (phoneNum
            .replace(/-/g, "")
            .replace(/\(/g, "")
            .replace(/\)/g, "")
            .replace(/\+/g, "")
            .replace(/\s/g, "")
            .replace(/_/g, "")
            .toString().length === 12
            ? `&search=${phoneNum
                .replace(/-/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .replace(/\+/g, "")
                .replace(/\s/g, "")
                .replace(/_/g, "")}`
            : "")
      )
      .then((res) => {
        setResults(get(res, "data.results", []));
        setCount(get(res, "data.count", 1));
      })
      .finally(() => {
        setMainLoading();
      });
  };
  const pageshow = (p) => {
    setPage(p);
    const inputValueToUrll = encodeURI(p);
    setSearchParams({
      page: p,
    });

    navigate(
      "./?page=" +
        inputValueToUrll +
        (answer ? "&company=" + answer : "") +
        (phone ? "&search=" + phone : "")
    );
  };
  const copyTextGenerete = (item) => {
    let s = ``;
    item?.app_item.forEach((e) => {
      e?.app_answer.forEach((ee) => {
        if (ee?.question?.type === 1) {
          s += `\n${ee?.question?.name}: ${ee.answer}`;
        } else if (ee?.question?.type === 2) {
          s += `\n${ee?.question?.name}: ${ee.answer}`;
        } else if (ee?.question?.type === 3) {
          s += `\n${ee?.question?.name}: ${ee.answer}`;
        } else if (ee?.question?.type === 4) {
          s += `\n${ee?.question?.name}: ${ee?.select_answer?.map(
            (e) => e?.name
          )}`;
        } else if (ee?.question?.type === 5) {
          s += `\n${ee?.question?.name}: ${ee?.select_answer?.map(
            (e) => e?.name
          )}`;
        } else if (ee?.question?.type === 6) {
          s += `\n${ee?.question?.name}: ${ee.answer.replace(/T/g, " ")}`;
        } else if (ee?.question?.type === 7) {
          s += `\n${ee?.question?.name}: ${ee.answer
            .replace(/-/g, "")
            .replace(/\(/g, "")
            .replace(/\)/g, "")
            .replace(/\s/g, "")
            .replace(/_/g, "")}`;
        } else {
          s += `\n${ee?.question?.name}: ${ee.answer}`;
        }
      });
    });
    s += `\nОператор:${
      item?.operator?.operator_name
        ? item?.operator?.operator_name
        : `№ ` + item?.operator?.id
    }`;
    if (item?.reply.toString().length !== 0) {
      s += `\n${`Ответь:`}`;
      item?.reply.forEach((ee) => {
        s += `\n${ee?.text}`;
      });
    } else {
      s += ``;
    }
    return s;
  };
  let totalP = [];
  for (let i = 0; i < count / 10; i++) {
    totalP.push(i);
  }
  return (
    <>
      <Loyout>
        <Container>
          <div className="body">
            <div className="filter">
              <h4>Клиент</h4>
              {company.map((ee) => (
                <div className="client">
                  <label htmlFor={"company" + ee?.id}>
                    <input
                      onChange={(e) => Client(e)}
                      id={"company" + ee?.id}
                      type="radio"
                      value={ee?.id}
                      className="checkbox"
                      checked={ee?.id == answer}
                    />
                    <p>{ee?.name}</p>
                  </label>
                </div>
              ))}

              <h4>Номер телефона</h4>
              <InputMask
                className="InputMask"
                placeholder="+998 __ ___ __ __"
                formatChars={{ b: "[0-9]" }}
                mask="+998 (bb) bbb-bb-bb"
                maskChar=""
                name="phone"
                value={phone || ""}
                onChange={(e) => PhoneNum(e)}
                //  onFocus={() => setSmsInvalid(false)}
              />

              <button className="clear" onClick={Clear}>
                Сбросить все фильтры
              </button>
            </div>
            <div className="results">
              <div className="title">
                <img
                  src="/images/back-arrow-icon 1.svg"
                  alt=""
                  onClick={() => navigate(-1)}
                />
                <div>
                  <div style={{ margin: "0" }}>Мои заявки</div>
                </div>
                <div>{""}</div>
              </div>
              {results && results?.length ? (
                <>
                  {results.map((results, ind) => (
                    <UIResult>
                      <div
                        style={{
                          display: "flex",
                          textAlign: "end",
                          justifyContent: "end",
                          right: "2px",
                          top: "11px",
                          position: "absolute",
                          margin: "0px 20px 0px 0px",
                        }}
                        key={ind}
                      >
                        {/*     <CopyToClipboard text={codeSnippet}>
                        </CopyToClipboard> */}
                        <div>
                          <CopyToClipboard
                            text={copyTextGenerete(results)}
                            onClick={notify}
                            //  onCopy={onCopyText}
                          >
                            <div>
                              <ToastContainer
                                style={{ color: "rebeccapurple" }}
                              />
                              <MdContentCopy
                                className="MdContentCopy"
                                color="#4F89CB"
                                size={"1.5em"}
                                onClick={notify}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          </CopyToClipboard>
                        </div>
                      </div>
                      <div
                        className="otvet_informations"
                        //ref={copy}

                        id={"item_" + ind}
                      >
                        {results?.app_item.map((e) => {
                          return (e?.app_answer).map((ee) => {
                            return (
                              <>
                                <div className="otvet_information">
                                  {ee?.question?.type === 1 ? (
                                    <>
                                      <p>
                                        {ee?.question?.name}:{" "}
                                        <span>{ee.answer}</span>
                                      </p>
                                    </>
                                  ) : ee?.question?.type === 2 ? (
                                    <>
                                      <p>
                                        {ee?.question?.name}:{" "}
                                        <span>{ee.answer}</span>
                                      </p>
                                    </>
                                  ) : ee?.question?.type === 3 ? (
                                    <>
                                      <p>
                                        {ee?.question?.name}:{" "}
                                        <span>{ee.answer}</span>
                                      </p>
                                    </>
                                  ) : ee?.question?.type === 4 ? (
                                    <>
                                      <p>
                                        {ee?.question?.name}:{" "}
                                        <span>
                                          {" "}
                                          {ee?.select_answer?.map(
                                            (e) => e?.name
                                          )}
                                        </span>
                                      </p>
                                    </>
                                  ) : ee?.question?.type === 5 ? (
                                    <>
                                      <p>
                                        {ee?.question?.name}:{" "}
                                        <span>
                                          {ee?.select_answer?.map(
                                            (e) => e?.name
                                          )}
                                        </span>
                                      </p>
                                    </>
                                  ) : ee?.question?.type === 6 ? (
                                    <>
                                      <p>
                                        {ee?.question?.name}:{" "}
                                        <span>
                                          {ee.answer.replace(/T/g, " ")}
                                        </span>
                                      </p>
                                    </>
                                  ) : ee?.question?.type === 7 ? (
                                    <>
                                      <p>
                                        {ee?.question?.name}:{" "}
                                        <span>{ee.answer}</span>
                                      </p>
                                    </>
                                  ) : ee?.question?.type === 8 ? (
                                    <>
                                      <p>
                                        {ee?.question?.name}:{" "}
                                        <span>{ee.answer}</span>
                                      </p>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </>
                            );
                          });
                        })}
                        <div className="otvet_information">
                          <p>
                            Оператор:{" "}
                            <span>
                              {results?.operator?.operator_name
                                ? results?.operator?.operator_name
                                : `№ ` + results?.operator?.id}
                            </span>
                          </p>
                        </div>
                        {results?.reply.toString().length !== 0 ? (
                          <>
                            <div className="otvet_title">Ответ:</div>
                            {results?.reply.map((ee) => {
                              return (
                                <>
                                  <div className="otvet">
                                    <p>{ee?.text}</p>
                                    <span
                                      style={{
                                        textAlign: "end",
                                        display: "flex",
                                        flexDirection: "column",
                                        fontSize:"12px",
                                        color:'rgb(120, 120, 120)'
                                      }}
                                    >
                                    <>  {ee?.created_at
                                        .replace("T", " ")
                                        .slice(0, 16)}</>
                                    </span>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </UIResult>
                  ))}
                </>
              ) : (
                <div
                  className="notFoundResult"
                  style={{ marginLeft: "14px", marginBottom: "20px" }}
                >
                  {" "}
                  <h4>Результат не найден! </h4>
                </div>
              )}

              {results && results.length !== 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "40px 0px",
                  }}
                >
                  <CSmartPagination
                    align="center"
                    className="red"
                    pages={totalP.length}
                    onActivePageChange={pageshow}
                    activePage={parseInt(page)}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
      </Loyout>
    </>
  );
}
